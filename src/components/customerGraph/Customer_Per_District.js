import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CSVLink, CSVDownload } from "react-csv";
import { teal } from "@mui/material/colors";
Chart.register(...registerables);

const Customers_Per_District = (props) => {
  const [loading, setloading] = useState(false);
  const [pin, setPin] = useState([]);
  const [cnt, setCnt] = useState([]);

  const fetch_data = async () => {
    console.log("data===" + props.info);
    if (props.info.length > 0 && pin.length == 0) {
      const pincodes = props.info
        .map((dataItem) => dataItem.pincode) // get all media types
        .filter((pincodes, index, array) => array.indexOf(pincodes) === index); // filter out duplicates

      const counts = pincodes.map((pincode) => ({
        type: pincode,
        count: props.info.filter((item) => item.pincode === pincode).length,
      }));
      console.log(counts);
      setPin([]);
      setCnt([]);
      counts.forEach((element) => {
        console.log(element);
        setPin((arr) => [...arr, `${element.type}`]);
        setCnt((arr) => [...arr, `${element.count}`]);
      });

      setloading(true);
    }
  };

  if (loading) {
    console.log(pin);
    var csvData = [];
    var headers = ["Area Pincode", "No. of Customers"];
    csvData.push(headers);
    for (var i = 0; i < pin.length; i++) {
      csvData.push([pin[i], cnt[i]]);
    }
    const state = {
      labels: pin,
      datasets: [
        {
          label: "customers",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: cnt,
        },
      ],
    };
    return (
      <>
        <Bar
        className="barGraph"
          data={state}
          options={{
            plugins: {
              title: {
                display: true,
                text: "customers per area",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  beginAtZero: true,
                },
              },
            },
          }}
        />
        <br></br>
        <div>
          <CSVLink
            class="download-btn"
            filename="Customers_per_district.csv"
            data={csvData}
            style={{
              textDecoration: "none",
              padding: 4,
              color: "white",
              backgroundColor: "teal",
              margin: 2,
              borderRadius: 4,
            }}
          >
            Customers Per Area
          </CSVLink>
        </div>
      </>
    );
  } else {
    if (pin.length == 0) fetch_data();
    return <></>;
  }
};

export default Customers_Per_District;
