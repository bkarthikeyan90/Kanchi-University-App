import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const departmentId = searchParams.get('departmentId');
    const level = searchParams.get('level');
    const active = searchParams.get('active') !== 'false';

    const where: any = {};
    if (active) where.isActive = true;
    if (departmentId) where.departmentId = departmentId;
    if (level) where.level = level;

    const courses = await prisma.course.findMany({
      where,
      include: {
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return auth.error;
    }

    const body = await request.json();
    const { name, code, departmentId, level, duration, description, eligibility, syllabusUrl } = body;

    if (!name || !code || !departmentId || !level) {
      return NextResponse.json(
        { error: 'Name, code, departmentId, and level are required' },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        name,
        code,
        departmentId,
        level,
        duration,
        description,
        eligibility,
        syllabusUrl,
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

