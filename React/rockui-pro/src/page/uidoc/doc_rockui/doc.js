export const commissionData = [
  {
    id: 1,
    title: "<h2>rokui组件</h2>",
    content:
      '## \n使用： \n```\nnpm install rockui \nimport "rockui/dist/rockui.css";\nimport { Button, Icon } from "rockui"\n\n文档：https://s2265681.github.io/code/React_Hook_UI/rockui/storybook-static/?path=/story/*\nnpm 地址： https://www.npmjs.com/package/rockui\n\n```\n\n\n\n',
    children: [],
    isDone: true,
  },
  {
    id: 4,
    title: "<h2>Button组件</h2>",
    content:
      '## \n// 使用\n```\n   <Button\n      size={ButtonSize.Small}\n      autoFocus\n      onClick={e => {\n        e.preventDefault();\n      }}\n      className="btn"\n   >\n```',
    children: [
      {
        id: 5,
        title: "<h3>参数列表</h3>",
        content:
          '# \n\n属性 |  类型| 是否必填 | 默认值 | 可选参数 \n|-|-|-|-|-|\nbtnType | | String |  否 |  "primary" |"default" \\| "dashed" \\|"danger" \\|"link" | "default" \nsize | 否 | "lg" \\| "sm" | "sm" \ndisabled| Boolean |否  | true \\| false | false \nhref | String | 否 | "" | ""  \n',
      },
      {
        id: 10,
        title: "<h3>预览</h3>",
        content:
          ' ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200607191155103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70,zoom="20%")',
      },
    ],
  },
  {
    id: 6,
    title: "<h2>Spider</h2>",
    content:
      '## \n// 使用\n```js\n  <Spider   \n      autoplay={false}\n    >\n      <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"/>\n      <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"/>\n      <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"/>\n  </Spider>\n  ```',
    children: [
      {
        id: 7,
        title: "<h3>参数列表</h3>",
        content:
          '### \n\n属性 | 说明 | 类型| 是否必填 | 默认值 | 可选参数 \n|-|-|-|-|-|-|\nautoplay | 是否自动轮播 | | Boolean |  false |  true\\|false | "true" \ndeployTime | 延迟时间 |  Number | 否 | 1000  | "--" \ninitIdx| 第几个开始 | Boolean |否  | true \\| false | false \nheight | 轮播图高度| Number | 否 | 300 | ""  \n',
      },
      {
        id: 11,
        title: "<h3>预览</h3>",
        content:
          ' <img  height="300" width="800" src="https://img-blog.csdnimg.cn/20200607191459690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70"/>',
      },
    ],
  },
  {
    id: 8,
    title: "<h2>Table</h2>",
    content:
      '\n##\n// 使用\n```js\nconst columns = [\n  {\n    title: "姓名",\n    dataIndex: "name",\n    key: "name",\n     sorter: {\n      compare: (a: { id: number }, b: { id: number }) => a.id - b.id,\n    },\n    render:(t:string)=><img style={{width:150,height:150}} src={t} alt={t}></img>\n  }]\nconst dataSource = [\n  {\n    id: "1",\n    name: "胡彦斌",\n    age: 32,\n    address: "西湖区湖底公园1号",\n    type: 1,\n    description: "胡彦斌是西湖区湖底公园1号的",\n    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",\n  }\n]\n\n  <Table\n    dataSource={dataSource}\n    columns={columns}\n    borderd\n    isTheme={"sepia(.6)"}\n    scroll={{ y: 600 }}\n    expandable={{\n      expandedRowRender: (record) => (\n        <span style={{ color: "rgb(100, 155, 0)" }}>{record.description}</span>\n      ),\n      onExpand: (key) => console.log(key, "key1111"),\n      rowExpandable: (record) => record.name !== "王祖蓝",\n    }}\n    rowSelection={{\n      type: "checkbox",\n      rowKey: "id",\n      rowChoosed: false, // 点击行是否选中\n      onChange: (selectedRowKeys: any) =>\n        console.log(selectedRowKeys, "selectedRowKeys>>"),\n    }}\n  />\n  ```\n',
    children: [
      {
        id: 9,
        title: "<h3>参数列表</h3>",
        content:
          "## \n\n属性 | 说明 | 类型| 是否必填 | 默认值 | 可选参数 \n|-|-|-|-|-|-|\ndataSource | 数据源 | | Array |  true |  -- | -- \ncolumns | 列内容 |  Array | true | --  | --\nrowSelection| 设置行 | Object | 否  | {} | --\nborderd | 设置table边框 | Boolean | 否 | -- | -- \nloading | 设置table Loading | Boolean | 否 | -- | -- \nisTheme | 设置table filter的属性 | string | 否 | -- | -- \nexpandable| 设置行展开 | Object | 否  | {} | --\nscroll| 设置超出高度滚动| Object | 否 | {x:300,y:300} | --\n",
      },
      {
        id: 12,
        title: "<h3>预览</h3>",
        content:
          '<img  height="300" width="800" src="https://img-blog.csdnimg.cn/20200607192110378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70"/>',
      },
    ],
  },
];
