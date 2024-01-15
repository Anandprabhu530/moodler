import { prisma } from "@/utils/db";
import { finduserbyIb } from "@/utils/finduser";
import NewEntry from "../components/NewEntry";
import Entrymap from "../components/Entrymap";

const getallentry = async () => {
  const user = await finduserbyIb();
  const data = await prisma.entries.findMany({
    where: {
      id: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const Dashboard = async () => {
  const entries = await getallentry();

  return (
    <div className="h-screen w-screen flex font-poppins">
      <div className="basis-1/6 border border-white">Hello</div>
      <div className="flex flex-col basis-5/6 border border-red-500 p-6">
        <div className="  text-4xl p-8">
          Track your Mood. Optimize your life
        </div>
        <div className="border border-white rounded-xl shadow-xl bg-black grid gap-8 grid-cols-3">
          <NewEntry />
          {entries.map((entry) => {
            <Entrymap entry={entry} key={entry.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
