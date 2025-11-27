import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Ensure this route is only evaluated at runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const [banners, latestNews, upcomingEvents, quickLinks] = await Promise.all([
      // Banners
      prisma.banner.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 5,
      }),
      // Latest News
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          publishedAt: true,
          category: true,
        },
      }),
      // Upcoming Events
      prisma.event.findMany({
        where: {
          isPublished: true,
          startDate: { gte: new Date() },
        },
        orderBy: { startDate: 'asc' },
        take: 5,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          startDate: true,
          location: true,
        },
      }),
      // Quick Links (from app settings or hardcoded)
      Promise.resolve([
        { id: '1', title: 'Admissions', url: '/admissions', icon: '📚' },
        { id: '2', title: 'Departments', url: '/departments', icon: '🏛️' },
        { id: '3', title: 'Examinations', url: '/examinations', icon: '📝' },
        { id: '4', title: 'Placements', url: '/placements', icon: '💼' },
        { id: '5', title: 'Gallery', url: '/gallery', icon: '📷' },
        { id: '6', title: 'Contact', url: '/contact', icon: '📞' },
      ]),
    ]);

    return NextResponse.json({
      banners,
      latestNews,
      upcomingEvents,
      quickLinks,
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

