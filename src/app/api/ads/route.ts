import prisma from '../../../lib/prisma';
import { useRouter } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest)  {
    const data = await req.json();
    const { picture } = data;

    try {
        const ads = await prisma.ads.create({
            data: {
                picture,
            },
        });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong." }, 
            { status: 500 }
        );
    }
}

//GET
export async function GET() {
    try {
        const ads = await prisma.ads.findMany();
        return NextResponse.json({ ads }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong." }, 
            { status: 500 }
        );
    }
}

//PUT
export async function PUT(req: NextRequest) {
    const data = await req.json();
    const { newPicture } = data;
    const id = data.id;

    try {
        const news = await prisma.news.update({
            where: {
                id,
            },
            data: {
                picture: newPicture,
            },
        });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { error: "Something went wrong." }, 
            { status: 500 }
        );
    }
}