import { useState } from "react";
import DonutChart from "react-donut-chart";
import { CSVLink } from "react-csv";

const Customers_Per_Product = (props) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [subproducts, setSubProducts] = useState([]);
  const [loading, setloading] = useState(false);
  // const [reactDonutChartdata,setReactDonutChartdata]=useState([]);

  const fetch_data = async () => {
    // console.log("sub=="+JSON.stringify(props.data[1]))
    if (products.length == 0 && props.data[0].length > 0) {
      var tmp = [];
      props.data[0].forEach((element) => {
        tmp.push(element.productName);
      });
      setProducts(tmp);
    }
    //setSubProducts([]);
    if (subproducts.length == 0 && props.data[1].length > 0) {
      var tmp = [];
      props.data[1].forEach((element) => {
        tmp.push(element.ProductName);
      });
      setSubProducts(tmp);
    }
    if (products.length > 0 && subproducts.length > 0) {
      //console.log("in products count");
      var tmp = [];
      products.forEach((element) => {
        let c = 0;
        subproducts.forEach((ele) => {
          if (element === ele) {
            c += 1;
          }
        });
        tmp.push(c);
      });
      setCount(tmp);
      setloading(true);
    }

    //console.log(products);
  };

  //  = [
  //     {
  //       label: "NDC",
  //       value: 25,
  //       color: "#00E396"
  //     },
  //     {
  //       label: "RDC",
  //       value: 65,
  //       color: "#FEB019"
  //     },
  //     {
  //       label: "STOCKIST",
  //       value: 100,
  //       color: "#FF4560"
  //     },
  //     {
  //       label: "HOSPITAL",
  //       value: 15,
  //       color: "#775DD0"
  //     }
  //   ];
  const reactDonutChartBackgroundColor = [
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#800000",
    "#00FFFF",
    "#FF00FF",
    "#2F4F4F",
    "#DDA0DD",
    "#BC8F8F",
    "#AAB8C2",
    "#DB4437",
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  if (loading && count.length > 0) {
    // console.log(products);
    // console.log(subproducts);
    // console.log(count);

    var reactDonutChartdata = [];
    for (var i = 0; i < products.length; i++) {
      var obj = {
        label: products[i],
        value: count[i],
        color: reactDonutChartBackgroundColor[i],
      };
      reactDonutChartdata.push(obj);
      //console.log(obj);
      //setReactDonutChartdata(arr=>[...arr,obj]);
    }
    //console.log("chartdata==="+reactDonutChartdata);
    var csvData = [];
    var headers = ["ProductName", "No. of Customers"];
    csvData.push(headers);
    for (var i = 0; i < products.length; i++) {
      csvData.push([products[i], count[i]]);
    }
    return (
      <div>
        <DonutChart
        className="donutGraph"
          width={500}
          height={350}
          onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
          strokeColor={reactDonutChartStrokeColor}
          data={reactDonutChartdata}
          colors={reactDonutChartBackgroundColor}
          innerRadius={reactDonutChartInnerRadius}
          selectedOffset={reactDonutChartSelectedOffset}
          onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
        />
        <br/>
        <CSVLink
          class="download-btn"
          filename="Customers_per_Product.csv"
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
          Customers Per Product
        </CSVLink>
      </div>
    );
  } else {
    if (!loading) {
      fetch_data();
    }
    return <></>;
  }
};
export default Customers_Per_Product;
