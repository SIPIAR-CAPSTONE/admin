import TopBar from "@/components/TopBar/TopBar";
import { columns } from "@/components/BugReport/column";
import { DataTable } from "@/components/DataTable/DataTable";

const data = {
  breadcrumbs: [
    {
      name: "Bug Report",
      href: "",
    },
  ],
  tempTableData: [
    {
      id: "728ed52f",
      issueType: "Performance Issue",
      issueDescription:
        "The patient’s chest was stiff, we struggled to achieve sufficient depth.",
      email: "a@example.com",
      date: "2023-07-25T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "12345678",
      issueType: "Equipment Failure",
      issueDescription:
        "The device was not functioning properly, causing a delay in treatment.",
      email: "b@example.com",
      date: "2023-07-26T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "90123456",
      issueType: "User Error",
      issueDescription:
        "The user did not follow proper protocol, resulting in an adverse event.",
      email: "c@example.com",
      date: "2023-07-27T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "11111111",
      issueType: "Software Glitch",
      issueDescription:
        "The software froze, causing a disruption in treatment.",
      email: "d@example.com",
      date: "2023-07-28T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "22222222",
      issueType: "Hardware Malfunction",
      issueDescription:
        "The device's hardware failed, causing a delay in treatment.",
      email: "e@example.com",
      date: "2023-07-29T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "33333333",
      issueType: "Environmental Issue",
      issueDescription:
        "The environment was not suitable for treatment, causing a delay.",
      email: "f@example.com",
      date: "2023-07-30T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "44444444",
      issueType: "Patient Complication",
      issueDescription:
        "The patient experienced a complication during treatment.",
      email: "g@example.com",
      date: "2023-07-31T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "55555555",
      issueType: "Staffing Issue",
      issueDescription:
        "There was a staffing shortage, causing a delay in treatment.",
      email: "h@example.com",
      date: "2023-08-01T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "66666666",
      issueType: "Supply Chain Disruption",
      issueDescription:
        "There was a disruption in the supply chain, causing a delay in treatment.",
      email: "i@example.com",
      date: "2023-08-02T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "77777777",
      issueType: "Regulatory Compliance",
      issueDescription:
        "There was a regulatory compliance issue, causing a delay in treatment.",
      email: "j@example.com",
      date: "2023-08-03T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
    {
      id: "qqqqq",
      issueType: "Regulatory",
      issueDescription:
        "There was a regulatory compliance issue, causing a delay in treatment.",
      email: "j@example.com",
      date: "2023-08-03T00:00:00.000Z",
      image: "https://via.placeholder.com/150x150",
    },
  ],
};

export default function BugReportPage() {
  return (
    <div>
      <TopBar breadcrumbsData={data.breadcrumbs} />
      <div className="px-4 pb-4 mx-auto md:py-8 max-w-screen-2xl">
        <DataTable
          tableName="Bug Report"
          columns={columns}
          data={data.tempTableData}
          searchColumn="issueType"
        />
      </div>
    </div>
  );
}
