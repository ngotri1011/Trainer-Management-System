import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "./badFbTable.css";
import {
  fetchModuleData,
  fetchTrainingProgramContentData,
} from "../apiService";

function BadFbTable({ moduleName }) {
  const [dataSource, setDataSource] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleData = await fetchModuleData();
        const data = await fetchTrainingProgramContentData(moduleData);
        
        const filteredModule = data?.filter((item) => item.moduleName === moduleName);
        setSelectedModule(filteredModule);
        setDataSource(filteredModule[0]?.badFeedbackList || []);
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [moduleName]);

  const calculateRowSpan = (data, index) => {
    const currentModule = data[index].module;
    if (index === 0 || data[index - 1].module !== currentModule) {
      const count = data.filter((item) => item.module === currentModule).length;
      return count;
    }
    return 0;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
      width: 80,
    },
    {
      title: "Trainer",
      dataIndex: "trainerName",
      key: "trainerName",
      width: 100,
    },
    {
      title: "Module",
      dataIndex: "moduleName",
      key: "moduleName",
      width: 120,
      render: (_, __, index) => {
        const rowSpan = calculateRowSpan(dataSource, index);
        return {
          children: (
            <span
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              {selectedModule[0]?.moduleName}
            </span>
          ),
          props: { rowSpan },
        };
      },
    },
    {
      title: "Reason for Bad Feedbacks",
      dataIndex: "reason",
      key: "reason",
      width: 90,
    },
  ];

  return (
    <div className="bad-feedback-table">
      <Table
        className="custom-table"
        size="small"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        style={{
          border: " 2px solid rgb(130, 130, 249)",
        }}
      />
    </div>
  );
}

export default BadFbTable;
