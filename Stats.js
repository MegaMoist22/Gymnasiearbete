import React, { Component } from 'react';
import { View, Text, Dimensions, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
//import { Button } from 'react-native';
import moment from "moment";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 73],
            color: (opacity = 1) => `rgba(32, 15, 944, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};
const dataBar = { //StackedBarChart
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
        [60, 60, 60],
        [30, 30, 60]
    ],
    barColors: ["#78F4eC", "#0ed6e0", "#aF3dbe"]
};

// const dataBar000 = { //StackedBarChart
//     labels: ["Test1", "Test2"],
//     legend: ["L1", "L2", "L3"],
//     data: [
//         [60, 60, 60],
//         [30, 30, 60]
//     ],
//     barColors: ["#78F4eC", "#0ed6e0", "#aF3dbe"]
// };

const chartConfig = {
    //backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    //backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const barChartConfig = {
    //backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    //backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.9,
    useShadowColorFromDataset: false, // optional
    showBarTops: true,
    segments: 3,

};
const HeatMapchartConfig = {
    //backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    //backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(79, 155, 446, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3

    useShadowColorFromDataset: false // optional
};


export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docID: "",
            title: "",
            description: "",


            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            checked7: false,
            ProgressionList: [],
            ProgressionWeek: [],
            date: "",
            dayNum: "",

            ProgressionDAY0: [],
            ProgressionDAY1: [],
            ProgressionDAY2: [],
            ProgressionDAY3: [],
            ProgressionDAY4: [],
            ProgressionDAY5: [],
            ProgressionDAY6: [],
            ProgressionDAY7: [],
            TotalWeekProg: [0, 0, 0, 0, 0, 0, 0, 0],
            TotalMonthProg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            SimpleMonthProg: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],

            ProgressionHeatMap: [],
            ModalData: [],

            //TestProg: [],
            active: true,
            activeWeek: false,
            isdayModalVisible: false,
            currentModalDay: "",

        };

        this.state.title = props.route.params.Data.name;
        this.state.description = props.route.params.Data.description;
        this.state.docID = props.route.params.Data.id;

        this.state.date = moment().format('YYYY-MM-DD');

        this.state.checked1 = props.route.params.Data.days[0];
        this.state.checked2 = props.route.params.Data.days[1];
        this.state.checked3 = props.route.params.Data.days[2];
        this.state.checked4 = props.route.params.Data.days[3];
        this.state.checked5 = props.route.params.Data.days[4];
        this.state.checked6 = props.route.params.Data.days[5];
        this.state.checked7 = props.route.params.Data.days[6];




        // this.state.dayNum = moment().day(this.state.date);
        this.state.dayNum = moment().format('e'); //Dagens nummer




        this.state.ProgressionList = props.route.params.progressions;

        let TestProg = props.route.params.progressions.map(item => {
            return {
                id: item.id,
                count: 0,
                name: item.name,
            }
        })

        let Stringifyer = JSON.stringify(TestProg)
        this.state.ProgressionDAY0 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY1 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY2 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY3 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY4 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY5 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY6 = JSON.parse(Stringifyer);
        this.state.ProgressionDAY7 = JSON.parse(Stringifyer);



        //FELET ÄR UNDER... TEsta btta komentar :))

        this.state.TotalMonthProg.fill(JSON.parse(Stringifyer));
        //this.state.TotalMonthProg = this.state.TotalMonthProg[JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer), JSON.parse(Stringifyer)]


        this.state.ProgressionWeek = props.route.params.progressions.map((item, Q) => {
            item.logBook.map(dayItem => {

                if (this.state.ProgressionHeatMap.some(Heat => Heat.date == dayItem.date)) {
                    this.state.ProgressionHeatMap[this.state.ProgressionHeatMap.findIndex(Heat => Heat.date == dayItem.date)].count += dayItem.count;

                } else {
                    this.state.ProgressionHeatMap.push({
                        date: dayItem.date,
                        count: dayItem.count,

                    })
                }


                this.state.TotalMonthProg[moment(dayItem.date).format("M") - 1][Q].count += dayItem.count; // Där jag slutade(Inga fel?!)

                this.state.SimpleMonthProg[moment(dayItem.date).format("M") - 1] += dayItem.count;


                switch (dayItem.date) {
                    case moment().day(this.state.dayNum).format('YYYY-MM-DD'):


                        this.state.ProgressionDAY0.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[0] += dayItem.count;
                        this.state.activeWeek = true;


                        break;
                    case moment().day(this.state.dayNum - 1).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY1.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }

                        })
                        this.state.TotalWeekProg[1] += dayItem.count;
                        this.state.activeWeek = true;
                        break;
                    case moment().day(this.state.dayNum - 2).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY2.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[2] += dayItem.count;
                        this.state.activeWeek = true;
                        break;
                    case moment().day(this.state.dayNum - 3).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY3.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[3] += dayItem.count;
                        this.state.activeWeek = true;
                        break;
                    case moment().day(this.state.dayNum - 4).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY4.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[4] += dayItem.count;
                        break;
                    case moment().day(this.state.dayNum - 5).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY5.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[5] += dayItem.count;
                        break;
                    case moment().day(this.state.dayNum - 6).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY6.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[6] += dayItem.count;
                        break;
                    case moment().day(this.state.dayNum - 7).format('YYYY-MM-DD'):

                        this.state.ProgressionDAY7.map((verificationItem, i) => {

                            if (item.id == verificationItem.id) {

                                verificationItem.count = dayItem.count;
                                return verificationItem;
                            }
                        })
                        this.state.TotalWeekProg[7] += dayItem.count;
                        break;
                    default:
                        //    console.log("NO," + this.state.date);
                        break;

                }
                return dayItem.date;
            }

            )

        })
        let nullo = {
            id: "AAA0",
            count: 0,
            name: "Empty",
        }
        let nullWeek = {
            id: "BBB0",
            count: 0.1,
            name: "Empty",
        }
        let i = 0;
        while (i <= 4) {
            if (!this.state.ProgressionDAY0[i]) {
                if (i == 0) this.state.active = false;
                this.state.ProgressionDAY0[i] = nullo;
                this.state.ProgressionDAY1[i] = nullo;
                this.state.ProgressionDAY2[i] = nullo;
                this.state.ProgressionDAY3[i] = nullo;
                this.state.ProgressionDAY4[i] = nullo;
                this.state.ProgressionDAY5[i] = nullo;
                this.state.ProgressionDAY6[i] = nullo;
                this.state.ProgressionDAY7[i] = nullo;
            }
            ++i;
        }

        let ii = 0;
        while (ii < 3) {
            if (this.state.ProgressionDAY0[ii] && this.state.activeWeek == false) {

                this.state.ProgressionDAY0[ii] = nullWeek;
                this.state.ProgressionDAY1[ii] = nullWeek;
                this.state.ProgressionDAY2[ii] = nullWeek;
                this.state.ProgressionDAY3[ii] = nullWeek;
            }
            ++ii;
        }


        this.dataBar = { //StackedBarChart
            labels: ["Today", moment().day(this.state.dayNum - 1).format('ddd'), moment().day(this.state.dayNum - 2).format('ddd'), moment().day(this.state.dayNum - 3).format('ddd')],
            legend: [this.state.ProgressionDAY0[0].name, this.state.ProgressionDAY0[1].name, this.state.ProgressionDAY0[2].name, this.state.ProgressionDAY0[3].name],
            data: [
                [this.state.ProgressionDAY0[0].count, this.state.ProgressionDAY0[1].count, this.state.ProgressionDAY0[2].count, this.state.ProgressionDAY0[3].count],
                [this.state.ProgressionDAY1[0].count, this.state.ProgressionDAY1[1].count, this.state.ProgressionDAY1[2].count, this.state.ProgressionDAY1[3].count],
                [this.state.ProgressionDAY2[0].count, this.state.ProgressionDAY2[1].count, this.state.ProgressionDAY2[2].count, this.state.ProgressionDAY2[3].count],
                [this.state.ProgressionDAY3[0].count, this.state.ProgressionDAY3[1].count, this.state.ProgressionDAY3[2].count, this.state.ProgressionDAY3[3].count],

            ],
            barColors: ["#DB324D", "#32E875", "#F5B700", "#008BF8"]
        };

        // this.dataBar = { //StackedBarChart
        //     labels: ["Today", "Testerday", "preYesterday", "prepreYesterday"],
        //     legend: [this.state.ProgressionDAY0[0].name, this.state.ProgressionDAY0[1].name, this.state.ProgressionDAY0[2].name, this.state.ProgressionDAY0[3].name],
        //     data: [
        //         [this.state.ProgressionDAY0[0].count, this.state.ProgressionDAY0[1].count, 1, 1],
        //         [0.1, 0.1, 0.1, 1],
        //         [1, 1, 1, 1],
        //         [1, 1, 1, 1],

        //     ],
        //     barColors: ["#78F4eC", "#0ed6e0", "#1F3dbe", "#1Fa1be"]
        // };

        this.data = {
            labels: [moment().day(this.state.dayNum - 7).format('ddd'), moment().day(this.state.dayNum - 6).format('ddd'), moment().day(this.state.dayNum - 5).format('ddd'), moment().day(this.state.dayNum - 4).format('ddd'), moment().day(this.state.dayNum - 3).format('ddd'), moment().day(this.state.dayNum - 2).format('ddd'), moment().day(this.state.dayNum - 1).format('ddd'), "Today"],
            datasets: [
                {
                    data: [this.state.TotalWeekProg[7], this.state.TotalWeekProg[6], this.state.TotalWeekProg[5], this.state.TotalWeekProg[4], this.state.TotalWeekProg[3], this.state.TotalWeekProg[2], this.state.TotalWeekProg[1], this.state.TotalWeekProg[0]],
                    color: (opacity = 1) => `rgba(32, 15, 944, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Goal Checked"] // optional
        };
        this.data2 = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: [this.state.SimpleMonthProg[0], this.state.SimpleMonthProg[1], this.state.SimpleMonthProg[2], this.state.SimpleMonthProg[3], this.state.SimpleMonthProg[4], this.state.SimpleMonthProg[5], this.state.SimpleMonthProg[6], this.state.SimpleMonthProg[7], this.state.SimpleMonthProg[8], this.state.SimpleMonthProg[9], this.state.SimpleMonthProg[10], this.state.SimpleMonthProg[11]],
                    color: (opacity = 1) => `rgba(32, 15, 944, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],
            legend: ["Goal Checked"] // optional
        };



        this.dataPie = [
            {
                name: this.state.ProgressionDAY0[0].name,
                population: this.state.ProgressionDAY0[0].count + this.state.ProgressionDAY1[0].count + this.state.ProgressionDAY2[0].count + this.state.ProgressionDAY3[0].count + this.state.ProgressionDAY4[0].count + this.state.ProgressionDAY7[0].count,
                color: "#DB324D",
                legendFontColor: "#DB324D",
                legendFontSize: 15
            },
            {
                name: this.state.ProgressionDAY0[1].name,
                population: this.state.ProgressionDAY0[1].count + this.state.ProgressionDAY1[1].count + this.state.ProgressionDAY2[1].count + this.state.ProgressionDAY3[1].count + this.state.ProgressionDAY4[1].count + this.state.ProgressionDAY7[1].count,
                color: "#32E875",
                legendFontColor: "#32E875",
                legendFontSize: 15
            },
            {
                name: this.state.ProgressionDAY0[2].name,
                population: this.state.ProgressionDAY0[2].count + this.state.ProgressionDAY1[2].count + this.state.ProgressionDAY2[2].count + this.state.ProgressionDAY3[2].count + this.state.ProgressionDAY4[2].count + this.state.ProgressionDAY7[2].count,
                color: "#F5B700",
                legendFontColor: "#F5B700",
                legendFontSize: 15
            },
            {
                name: this.state.ProgressionDAY0[3].name,
                population: this.state.ProgressionDAY0[3].count + this.state.ProgressionDAY1[3].count + this.state.ProgressionDAY2[3].count + this.state.ProgressionDAY3[3].count + this.state.ProgressionDAY4[3].count + this.state.ProgressionDAY7[3].count,
                color: "#008BF8",
                legendFontColor: "#008BF8",
                legendFontSize: 15
            },
            {
                name: this.state.ProgressionDAY0[4].name,
                population: this.state.ProgressionDAY0[4].count + this.state.ProgressionDAY1[4].count + this.state.ProgressionDAY2[4].count + this.state.ProgressionDAY3[4].count + this.state.ProgressionDAY4[4].count + this.state.ProgressionDAY7[4].count,
                color: "#5438DC",
                legendFontColor: "#5438DC",
                legendFontSize: 15
            }
        ];

        // this.modalDataPie = [
        //     {
        //         name: this.state.ProgressionDAY0[0].name,
        //         population: this.state.ProgressionDAY0[0].count + this.state.ProgressionDAY1[0].count + this.state.ProgressionDAY2[0].count + this.state.ProgressionDAY3[0].count + this.state.ProgressionDAY4[0].count + this.state.ProgressionDAY7[0].count,
        //         color: "rgba(599, 122, 234, 1)",
        //         legendFontColor: "#7F7F7F",
        //         legendFontSize: 15
        //     },
        //     {
        //         name: this.state.ProgressionDAY0[1].name,
        //         population: this.state.ProgressionDAY0[1].count + this.state.ProgressionDAY1[1].count + this.state.ProgressionDAY2[1].count + this.state.ProgressionDAY3[1].count + this.state.ProgressionDAY4[1].count + this.state.ProgressionDAY7[1].count,
        //         color: "#F00",
        //         legendFontColor: "#7F7F7F",
        //         legendFontSize: 15
        //     },]
    }

    TestButton() {
        console.log(this.state.ProgressionHeatMap)
    }
    // VIKTIG SPARA ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    DayPress(para) {


        //console.log(para);

        let TempProgList = [];
        this.state.ProgressionList.map(item => {
            item.logBook.map(logItem => {

                if (logItem.date == para.date) {
                    TempProgList.push({ name: item.name, count: logItem.count })
                }
            })

        })
        this.setState({ ModalData: TempProgList })



        this.setState({ isdayModalVisible: true });
        this.setState({ currentModalDay: para.date });
        console.log(TempProgList);
    }

    // VIKTIG SPARA ↑↑↑↑↑↑↑↑↑↑↑↑↑

    // modalDataPie = [
    //     {
    //         name: this.state.ModalData[0].name,
    //         population: this.state.ModalData[0].count + this.state.ModalData[0].count + this.state.ModalData[0].count + this.state.ModalData[0].count + this.state.ModalData[0].count + this.state.ModalData[0].count,
    //         color: "rgba(599, 122, 234, 1)",
    //         legendFontColor: "#7F7F7F",
    //         legendFontSize: 15
    //     },
    //     {
    //         name: this.state.ModalData[1].name,
    //         population: this.state.ModalData[1].count + this.state.ModalData[1].count + this.state.ModalData[1].count + this.state.ModalData[1].count + this.state.ModalData[1].count + this.state.ModalData[1].count,
    //         color: "#F00",
    //         legendFontColor: "#7F7F7F",
    //         legendFontSize: 15
    //     },]
    modalDataPie = [
        {
            name: "this.state.ModalData[0].name",
            population: 5,
            color: "rgba(599, 122, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "this.state.ModalData[1].name",
            population: 6,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },]


    render() {
        return (
            <View>
                {this.state.active == true ? (
                    <ScrollView style={{ width: "100%" }}>
                        <Text style={{ alignSelf: "center", fontSize: 17, marginTop: "5%" }}>Weekly Progress </Text>
                        <LineChart
                            data={this.data}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}


                        />
                        <StackedBarChart
                            data={this.dataBar}
                            width={screenWidth}
                            height={220}
                            chartConfig={barChartConfig}
                            barPercentage={"1"}

                        />
                        <View>
                            <PieChart
                                data={this.dataPie}
                                width={screenWidth}
                                height={screenHeight * (2 / 5)}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}

                                center={[10, 10]}
                            //absolute
                            />

                        </View>

                        <Text style={{ alignSelf: "center", fontSize: 17, marginTop: "5%" }}>Monthly Progress </Text>
                        <LineChart
                            data={this.data2}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                        <ContributionGraph
                            values={this.state.ProgressionHeatMap}
                            endDate={new Date(this.state.date)}
                            numDays={100}
                            width={screenWidth}
                            height={220}
                            chartConfig={HeatMapchartConfig}
                            style={{ marginRight: "5%", marginHorizontal: -screenWidth * 0.05 }}
                        // onDayPress={(para) => this.DayPress(para)}
                        />

                        <Modal transparent={true} visible={this.state.isdayModalVisible}>
                            <TouchableOpacity style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: "center" }} onPress={() => this.setState({ isdayModalVisible: false })}>
                                <View style={styles.popUpp}>
                                    <Text style={{ alignSelf: "center" }}>Teext</Text>

                                    <PieChart
                                        data={this.modalDataPie}
                                        width={screenWidth}
                                        height={screenHeight * (2 / 5)}
                                        chartConfig={chartConfig}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"15"}

                                        center={[10, 10]}
                                    //absolute
                                    />


                                </View>
                            </TouchableOpacity>
                        </Modal>

                        {/* <Button title="TEst" onPress={() => this.TestButton()} /> */}
                    </ScrollView>
                ) : (
                        <Text>No Proggression yet </Text>

                    )}


            </View>
        );
    }
}
const styles = StyleSheet.create({
    popUpp: {
        backgroundColor: "#ffffff",
        alignSelf: "center",
        width: "70%",
        height: "50%",
        borderRadius: 5
    },


})
