import { analyze_data } from "@/utils/ai";
import { prisma } from "@/utils/db";
import { finduserbyIb } from "@/utils/finduser"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json();
    const user = await finduserbyIb();
    const entryedit = await prisma.entries.update({
        where: {
            UserId_id: {
                UserId: user?.id as string,
                id: params.id,
            }
        },
        data: {
            content,
        }
    })
    revalidatePath('/dashboard')
    const analyze = await analyze_data(content)
    revalidatePath('/dashboard')


    const updateduser = await prisma.analysis.upsert({
        where: {
            entryId: entryedit.id,
        },
        update: {
            ...analyze
        },
        create: {
            entryId: entryedit.id,
            userId: user?.id,
            ...analyze

        },
    })

    revalidatePath('/dashboard')

    return NextResponse.json({ data: { ...analyze, analysis: updateduser } })
}