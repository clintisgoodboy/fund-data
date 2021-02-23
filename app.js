// create an express app
const express = require('express');
const superagent = require('superagent');

const app = express();

// define the first route
app.get('/getFundData', function (req, res) {
  let url = `https://fundgz.1234567.com.cn/js/${
    req.query.code
  }.js?rt=${Math.random()}`;
  let _res = res;

  superagent.get(url).then(res => {
    try {
      let json = JSON.stringify(res.body);
      let copy = Buffer.from(JSON.parse(json));
      let data = JSON.parse(copy.toString().slice(8, -2));

      console.log(data);
      // {
      //   fundcode: '000083',
      //   name: '汇添富消费行业混合',
      //   jzrq: '2021-02-22',
      //   dwjz: '8.9750',
      //   gsz: '8.9009',
      //   gszzl: '-0.83',
      //   gztime: '2021-02-23 15:00'
      // }
      _res.send(`
      <p id='fundcode'>基金代码：${data.fundcode}</p>
      <p id='name'>基金名称：${data.name}</p>
      <p id='jzrq'>时间：${data.jzrq}</p>
      <p id='dwjz'>单位净值：${data.dwjz}</p>
      <p id='gsz'>净值估算：${data.gsz}</p>
      <p id='gszzl'>${data.gszzl}</p>
      <p id='gztime'>${data.gztime}</p>
      `);
    } catch (error) {}
  });
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
