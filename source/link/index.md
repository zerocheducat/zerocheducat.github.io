---
title: 游戏
date: 2024-11-15 12:00:00

---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 修改网页标题 -->
  <title>MINI GAME</title>
  
  <!-- 修改网页描述 -->
  <meta name="description" content="Play this fun and interactive mini game.">
  
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
    }
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .score {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* 按钮样式 */
    button {
      font-size: 20px;
      padding: 10px 20px;
      cursor: pointer;
      background-color: #d3d3d3; /* 设置按钮背景为浅灰色 */
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s ease; /* 添加平滑过渡效果 */
    }

    /* 鼠标悬停时按钮变暗 */
    button:hover {
      background-color: #a9a9a9; /* 悬停时变暗 */
    }

    /* 页脚样式 */
    footer {
      margin-top: 50px;
      font-size: 16px;
      color: #0db8e2;
    }

    footer a {
      text-decoration: none;
      color: #0db8e2;
    }

    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  
  <!-- 页眉部分 -->
  <div class="game-container">
    <h1>一键Ciallo~(∠・ω < )⌒☆</h1> <!-- 修改页眉 -->
    <p class="score">Ciallo~: <span id="score">0</span></p>
    <button onclick="incrementScore()">Ciallo~(∠・ω < )⌒☆</button>
  </div>

  <!-- 页脚部分 -->
  <footer>
    <p>作者: <a href="https://github.com/zerocheducat" target="_blank">zerocheducat</a></p>
  </footer>

  <!-- 声音文件 -->
  <!--<audio id="clickSound" src="click-sound.mp3"></audio> -->

  <script>
    let score = 0;

    // 增加分数
    function incrementScore() {
      score++;
      document.getElementById('score').textContent = score;

      // 播放声音
      //const clickSound = document.getElementById('clickSound');
      //clickSound.currentTime = 0; // 重置音频播放位置
      //clickSound.play();
    }
  </script>
</body>
</html>
