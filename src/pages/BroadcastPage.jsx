import TopBar from "@/components/TopBar/TopBar";

const data = {
  breadcrumbs: [
    {
      name: "Broadcast",
      href: "broadcast",
    },
  ],
};

export default function BroadcastPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
    </div>
  );
}
