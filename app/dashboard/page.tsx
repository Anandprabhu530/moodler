import { prisma } from "@/utils/db";
import { finduserbyIb } from "@/utils/finduser";
import NewEntry from "../components/NewEntry";
import Entrymap from "../components/Entrymap";
import Link from "next/link";

const getallentry = async () => {
  const user = await finduserbyIb();
  const data = await prisma.entries.findMany({
    where: {
      UserId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });
  return data;
};

const Dashboard = async () => {
  const entries = await getallentry();

  return (
    <div className="font-poppins h-full ">
      <div className=" shadow-xl  grid gap-6 grid-cols-3 p-6  h-[95%] overflow-auto rounded-xl bg-[#ffffff] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
        <NewEntry />
        {entries.map((entry) => (
          <Link href={`/dashboard/${entry.id}`} key={entry.id}>
            <Entrymap entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
