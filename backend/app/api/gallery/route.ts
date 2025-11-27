import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/middleware';

const ITEMS_PER_PAGE = 20;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const albumId = searchParams.get('albumId');
    const type = searchParams.get('type');
    const published = searchParams.get('published') !== 'false';

    const where: any = {
      isPublished: published,
    };

    if (albumId) {
      where.albumId = albumId;
    }

    if (type) {
      where.type = type;
    }

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          album: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
      prisma.gallery.count({ where }),
    ]);

    return NextResponse.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
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
    const { title, description, type, imageUrl, videoUrl, albumId, isPublished } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    if (type === 'IMAGE' && !imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required for image type' },
        { status: 400 }
      );
    }

    if (type === 'VIDEO' && !videoUrl) {
      return NextResponse.json(
        { error: 'Video URL is required for video type' },
        { status: 400 }
      );
    }

    const item = await prisma.gallery.create({
      data: {
        title,
        description,
        type,
        imageUrl,
        videoUrl,
        albumId,
        isPublished: isPublished || false,
      },
      include: {
        album: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

