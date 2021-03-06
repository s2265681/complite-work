
import React, { Component } from 'react';
import { View } from 'react-native';
import { 
  VictoryPie, 
  VictoryLegend, 
  VictoryTooltip 
} from 'victory-native';
import request from '../../utils/request';
import Loading from '../../components/Loading';
import style from '../../assets/styles/pages/exam/resultStatistics';

export default class ResultStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSum: 0,
      questionLength: 0,
      rightsum: [],
      isLoading: false,
      result: [2,2,2,2]
    };
    this.exam_id = this.props.navigation.state.params.exam_id;
    this.name = this.props.navigation.state.params.name;
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getContent();
  }

  getContent() {
    let options = {
      url: '/exam/queryQuestionById?exam_id=' + this.exam_id,
      method: 'get'
    };
    let vm = this;
    request(options).then(function (res) {
      let result = res.data;
      if (result.code === 0) {
        vm.setState({
          questionLength: result.data.length
        });
        vm.getUserSum();
      }
    });
  }

  getUserSum() {
    let options = {
      url: '/exam/queryUserById?exam_id=' + this.exam_id,
      method: 'get'
    };
    let vm = this;
    request(options).then(function (res) {
      let result = res.data;
      if (result.code === 0) {
        vm.setState({
          userSum: result.data.length
        });
        vm.getScore();
      }
    });
  }

  getScore() {
    let options = {
      url: '/exam/queryScoreById?exam_id=' + this.exam_id,
      method: 'get'
    };
    let vm = this;
    request(options).then(function (res) {
      let result = res.data;
      if (result.code === 0) {
        vm.setState({
          rightsum: result.data,
          isLoading: false
        });
        vm.getResult();
      }
    });
  }

  getResult(){
    let rightSum;
    var sum = new Array(0, 0, 0, 0);
    var scores = new Array();
    for (var i = 0; i < this.state.userSum; i++) {
      if (this.state.rightsum[i] === undefined) {
        rightSum = 0;
      } else {
        rightSum = this.state.rightsum[i].rightSum;
      }
      var sc = rightSum / this.state.questionLength * 100;
      scores.push(sc);
      if (scores[i] >= 85){
        sum[0]++;
      } else if (scores[i] >= 75 && scores[i] < 85) {
        sum[1]++;
      } else if (scores[i] >= 60 && scores[i] < 75) {
        sum[2]++;
      } else {
        sum[3]++;
      }
    }
    this.setState({
      result: sum
    });
  }

  // loading 
  getLoading(){
    if(this.state.isLoading === true){
      return (
        <Loading loadingContent="??????????????????????????????..." />
      );
    }
  }

  render() {
    const colorScale = ['#c23531', '#61a0a8', '#d48265', '#bda29a'];
    return (
        <View>
          <View style={style.pie}>
            <VictoryLegend
                orientation="vertical"
                data={[
                  {
                    name: '?????????   < 60 ???',
                    symbol: { fill: colorScale[0], type: 'square' },
                  },
                  {
                    name: '??????     60 - 75 ???',
                    symbol: { fill: colorScale[1], type: 'square' },
                  },
                  {
                    name: '??????     75 - 85 ???',
                    symbol: { fill: colorScale[2], type: 'square' },
                  },
                  {
                    name: '??????     > 85 ???',
                    symbol: { fill: colorScale[3], type: 'square' },
                  }
                ]}
                width={180}
                height={125}
            />
            <VictoryPie
                colorScale={colorScale}
                data={[
                  { y: this.state.result[3], label: '?????????:' + this.state.result[3] + '???'},
                  { y: this.state.result[2], label: '??????:' + this.state.result[2] + '???' },
                  { y: this.state.result[1], label: '??????:' + this.state.result[1] + '???' },
                  { y: this.state.result[0], label: '??????:' + this.state.result[0] + '???' }
                ]}
                innerRadius={60}
                height={300}
                width={345}
                animate={{
                  duration: 2000
                }}
                labelComponent={
                    <VictoryTooltip
                        active={({ datum }) => datum.y === 0 ? false : true}
                        constrainToVisibleArea={true}
                        flyoutHeight={30}
                        flyoutStyle={{ strokeWidth: 0.1}}
                    />
                }
            />
          </View>
          {this.getLoading()}
        </View>
    );
  }
}