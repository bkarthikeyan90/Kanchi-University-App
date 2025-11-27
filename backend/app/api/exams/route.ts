import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') !== 'false';
    const upcoming = searchParams.get('upcoming') === 'true';

    const where: any = {
      isPublished: published,
    };

    if (upcoming) {
      where.examDate = { gte: new Date() };
    }

    const exams = await prisma.examination.findMany({
      where,
      orderBy: { examDate: 'asc' },
    });

    return NextResponse.json({ data: exams });
  } catch (error) {
    console.error('Error fetching exams:', error);
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
      title,
      description,
      examDate,
      timetableUrl,
      hallTicketUrl,
      resultsUrl,
      departmentId,
      courseId,
      isPublished,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const exam = await prisma.examination.create({
      data: {
        title,
        description,
        examDate: examDate ? new Date(examDate) : null,
        timetableUrl,
        hallTicketUrl,
        resultsUrl,
        departmentId,
        courseId,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error('Error creating exam:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

