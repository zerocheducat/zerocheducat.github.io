---
title: 搭建hexo的心得体会
date: 2024-11-18 17:16:54
tags: []
---

欢迎来到我的神奇妙妙屋！

以下为作者本人在搭建此博客的心得体会，不定期写入
2024/11/18
现在博客已经基本可以运行了，包括音乐栏当中的好玩的网站，以及超级好听的音乐，强烈推荐大家去听（笑
关于hexo的基本搭建，各位可以访问[hexo](https://hexo.io/zh-cn/docs/)直接抵达官方下载地址，跟着一步步做，不会出太大问题

以下将列举一些常见的错误或报错信息


```plaintext
(node:24016) ExperimentalWarning: CommonJS module C:\Program Files\nodejs\node_modules\npm\node_modules\debug\src\node.js is loading ES Module C:\Program Files\nodejs\node_modules\npm\node_modules\supports-color\index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use node --trace-warnings ... to show where the warning was created)
 up to date in 1s
 38 packages are looking for funding
  run npm fund for details
```

这个警告信息表明你的 Node.js 环境正在使用 CommonJS 模块加载一个 ES 模块，这在 Node.js 中是一个实验性特性，可能在未来的版本中会有所变化。具体来说，这个警告是由于 debug 模块在加载 supports-color 模块时使用了 require()，而 supports-color 是一个 ES 模块。一般不会有什么影响，忽略即可


```plaintext
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html  
Error: Spawn failed
    at ChildProcess.<anonymous> (D:\hexo\node_modules\hexo-deployer-git\node_modules\hexo-util\lib\spawn.js:51:21)
    at ChildProcess.emit (node:events:507:28)
    at cp.emit (D:\hexo\node_modules\cross-spawn\lib\enoent.js:34:29)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
```


这是一个非常常见的问题。
出现 FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html Error: Spawn failed 错误时，通常是由于 Hexo 部署过程中出现了问题。这个错误通常与执行某些外部命令（如 Git 部署命令）失败有关。具体来说，Spawn failed 可能表示 Hexo 在尝试执行子进程时失败，通常是因为以下原因：
常见原因及解决方法
1. Git 配置问题
如果你正在使用 Git 来部署 Hexo，确保你已经正确安装并配置了 Git，并且在系统环境变量中包含了 Git 的路径。
运行以下命令来检查 Git 是否正确安装：

```bash
git --version
```
如果 Git 没有正确安装或无法识别，可以重新安装 Git：Git 官网下载，并确保将 Git 添加到环境变量中。
2. 缺少 git 或 ssh 执行权限
有时 hexo-deployer-git 插件会因为没有足够的权限来执行 Git 或 SSH 命令而失败。
确保你有权限执行 Git 命令，并且已经配置好 SSH 密钥（如果你使用的是 Git 通过 SSH 部署）。
你可以通过以下命令检查 SSH 配置是否正确：

```bash
ssh -T git@github.com
```


如果配置正确，会看到 GitHub 的欢迎信息。

3. Node.js 版本问题
hexo-deployer-git 插件可能与 Node.js 版本不兼容。你可以检查当前使用的 Node.js 版本：

```bash
node -v
```
Hexo 和它的插件通常要求使用稳定版本的 Node.js，最好使用长期支持（LTS）版本。
如果 Node.js 版本过高，可能会导致兼容性问题，尝试安装一个 LTS 版本的 Node.js：Node.js 官网
4. 依赖问题
运行 npm install 安装所有缺失的依赖项。确保你已经在 Hexo 项目的根目录中，并且执行以下命令：

```bash
npm install
```
如果出现 npm 安装错误，尝试使用 npm ci 来重新安装依赖项：

```bash
npm ci
```
5. 检查 Hexo 部署配置
确保在 _config.yml 中的部署配置是正确的。以下是一个典型的 Git 部署配置：

```bash
deploy:
  type: git
  repo: https://github.com/yourusername/your-repository.git    //（请根据自己账户实际情况填写）
  branch: master
```
确保 repo 地址正确，并且你有权限访问该 Git 仓库。如果你使用 SSH 部署，确保 repo 配置为 SSH 链接：

```bash
deploy:
  type: git
  repo: git@github.com:yourusername/your-repository.git  
  branch: master
```
6. 路径或文件名问题
确保你的 Hexo 项目路径中没有特殊字符或空格，特别是在 Windows 系统中，某些路径问题可能会导致命令执行失败。
尝试将 Hexo 项目文件夹移动到没有空格或特殊字符的路径下，如 C:\Hexo。
7. 检查 Hexo 部署日志
如果上述步骤没有解决问题，建议查看 Hexo 的详细日志来获取更多信息。运行部署命令时，使用 --debug 参数来输出更详细的错误信息：

```bash
hexo deploy --debug
```
8. 重新安装插件
如果 hexo-deployer-git 插件出现问题，尝试重新安装插件：

```bash
npm uninstall hexo-deployer-git
npm install hexo-deployer-git
```
在下载或者部署到github库的过程中请保证链接的网络畅通且没有问题，否则就会产生以下问题：

```plaintext
(node:28032) ExperimentalWarning: CommonJS module C:\Program Files\nodejs\node_modules\npm\node_modules\debug\src\node.js is loading ES Module C:\Program Files\nodejs\node_modules\npm\node_modules\supports-color\index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use node --trace-warnings ... to show where the warning was created)
npm error code ETIMEDOUT
npm error syscall connect
npm error errno ETIMEDOUT
npm error network request to https://registry.npmjs.org/hexo-cli failed, reason: connect ETIMEDOUT 104.16.25.34:443
npm error network This is a problem related to network connectivity.
npm error network In most cases you are behind a proxy or have bad network settings.
npm error network
npm error network If you are behind a proxy, please make sure that the
npm error network 'proxy' config is set properly.  See: 'npm help config'
npm error A complete log of this run can be found in: C:\Users\A\AppData\Local\npm-cache\_logs\2024-11-13T12_17_10_749Z-debug-0.log
```

这个时候就可以考虑换个网络，或者打入一个镜像，以下为解决方案：


1. 检查网络连接
确保你的计算机有稳定的互联网连接。
如果你在使用 Wi-Fi，尝试切换到有线连接，或者重新启动路由器。
2. 检查代理设置
如果你处于公司或学校网络，可能存在代理服务器限制。你可以通过以下命令检查 npm 的代理设置：

```bash
npm config get proxy
npm config get https-proxy
```
如果这些代理设置不正确或者不需要使用代理，你可以取消它们：

```bash
npm config delete proxy
npm config delete https-proxy
```
如果你确实需要使用代理，请确保代理设置正确。
3. 增加 npm 的连接超时
你可以尝试通过增加 npm 的网络请求超时时间来解决超时问题。运行以下命令增加超时值：

```bash
npm config set timeout 60000
```
这将超时限制设置为 60 秒（默认是 30 秒），有时可以避免超时错误。
4. 更换网络或 VPN
如果你处于某些限制性网络环境中（如公司或学校的网络），尝试使用 VPN 或切换到其他网络环境（例如家庭网络或移动热点）进行安装。
5. 清理 npm 缓存
如果网络连接正常但问题仍然存在，可以尝试清理 npm 缓存，以防缓存中的某些错误数据导致问题：

```bash
npm cache clean --force
```
6. 检查 npm 配置
如果问题是由 npm 配置引起的，你可以通过以下命令重置 npm 配置：

```bash
npm config edit
```
这会打开 npm 配置文件，你可以检查是否有不正确的配置导致连接问题。

Hexo 安装过程一直在加载可能是由于网络问题或者 npm 配置导致的。以下是一些解决方法，可以帮助你加速或解决 Hexo 的下载问题。

1. 使用国内镜像源
由于网络连接到官方的 npm 源可能较慢，可以尝试使用国内的 npm 镜像源。一般推荐使用淘宝的镜像源：

```bash
npm config set registry https://registry.npmmirror.com/    //（此处是一个镜像，可直接复制前面链接使用）
```
然后重新执行安装命令：

```bash
npm install -g hexo-cli
```
2. 使用 cnpm
如果直接使用 npm 速度较慢，也可以尝试使用 cnpm（中国 npm）来安装。首先，安装 cnpm：

```bash
npm install -g cnpm --registry=https://registry.npmmirror.com     //（上同，不再赘述）
```

安装完成后，用 cnpm 来安装 Hexo：

```bash
cnpm install -g hexo-cli
```
3. 清理 npm 缓存
缓存问题有时会导致下载卡住，可以尝试清理缓存：


```bash
npm cache clean --force
```
然后重新尝试安装 Hexo：


```bash
npm install -g hexo-cli
```
4. 增加超时设置
如果网络不稳定，可以增加 npm 的超时设置，避免因为超时导致安装失败：


```bash
npm config set timeout 60000
```
5. 使用 VPN 或更换网络
如果以上方法无效，可以尝试使用 VPN 或者换一个网络环境，特别是在某些限制性网络环境中，这些操作可能会有所帮助。
6. 更新 npm
确保你的 npm 是最新版本，以避免可能的兼容性或网络问题：


```bash
npm install -g npm
```
更新后，重新尝试安装 Hexo。

暂时先写到此，后面想起来继续补充，byebye！(∠・ω< )⌒☆