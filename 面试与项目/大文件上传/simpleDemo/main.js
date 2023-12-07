const showImg = document.getElementById("showImg");
const showVideo = document.getElementById("showVideo");
const THREAD_COUNT = navigator.hardwareConcurrency || 4; // 开启4个线程

const CHUNK_SIZE = 5 * 1024 * 1024;

function render(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  if (file.type.includes("video")) {
    showVideo.setAttribute("src", url);
    showVideo.style.display = "block";
  } else {
    showImg.setAttribute("src", url);
  }
  // 文件切割
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE);

  // 太耗性能 启用 web worker 多线程
  //   for (let i = 0; i < chunkCount; i++) {
  //     createChunk(file, i, CHUNK_SIZE).then((res) => {
  //       console.log(res, "res....");
  //     });
  //   }

  const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
  let result = [];
  // 多个线程一起跑
  for (let i = 0; i < THREAD_COUNT; i++) {
    // 创建一个新的 Worker 线程
    const worker = new Worker("worker.js", {
      type: "module",
    });

    // 计算每个线程的开始索引和结束索引
    const startIndex = i * workerChunkCount;
    let endIndex = startIndex + workerChunkCount;
    if (endIndex > chunkCount) {
      endIndex = chunkCount;
    }

    // 发送去计算
    worker.postMessage({
      file,
      CHUNK_SIZE,
      startIndex,
      endIndex,
    });

    // 接收计算结果
    worker.onmessage = (e) => {
      console.log(e.data, "data/");
      for (let i = startIndex; i < endIndex; i++) {
        result[i] = e.data[i - startIndex];
      }
      worker.terminate();
      // finishCount--;
    };

    console.log(result, "result");
  }
}

document.querySelector("input").onchange = function (event) {
  render(event);
};
