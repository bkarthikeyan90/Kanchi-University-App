import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const departmentId = searchParams.get('departmentId');
    const active = searchParams.get('active') !== 'false';

    const where: any = {};
    if (active) where.isActive = true;
    if (departmentId) where.departmentId = departmentId;

    const faculty = await prisma.faculty.findMany({
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

    return NextResponse.json({ data: faculty });
  } catch (error) {
    console.error('Error fetching faculty:', error);
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
    const {
      name,
      email,
      phone,
      designation,
      departmentId,
      imageUrl,
      bio,
      qualifications,
      researchAreas,
    } = body;

    if (!name || !email || !designation || !departmentId) {
      return NextResponse.json(
        { error: 'Name, email, designation, and departmentId are required' },
        { status: 400 }
      );
    }

    const faculty = await prisma.faculty.create({
      data: {
        name,
        email,
        phone,
        designation,
        departmentId,
        imageUrl,
        bio,
        qualifications,
        researchAreas,
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

    return NextResponse.json(faculty, { status: 201 });
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

