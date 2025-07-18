# git

git配置

````bash
git config --global user.name [GithubId] #中括号不需要加
git config --global user.email [GithubEmail]

#查看用户配置是否成功
git config --global --list
````

git命令

```bash
#初始化仓库
git init #有副作用

#查看git状态
git status

#挑选文件进入暂存区
git add [filename]

#生成版本
git commit -m "描述信息"
```

在 Git 中，`origin` 是一个默认的名称，指向你本地仓库和远程仓库之间的连接。它并不是一个分支，而是一个远程仓库的别名。当你使用 `git push origin main` 时，`origin` 是指远程仓库的名字，而 `main` 是你要推送的分支名。

## 建立http连接

上传远端仓库

```bash
#推送远端
#先创建github仓库，保证仓库干净和协议是https
#复制命令
git remote add origin [repo url]

#执行推送(第一次)
git push origin main
#后续推送
git push
#如果远端有更新，同步操作
git pull origin main
#克隆仓库
git clone [repo url]
```

多人协作：分支（branch）

main主分支（禁止推送，用来发布版本），用pr流程合并

```bash
git checkout -b b1  //创建b1分支
git checkout -b b2  //创建b2分支
git checkout b1 //切换到b1分支
git merge b1 //在主分支上将b1合并进来
git merge main //在b2上将main合并进来，从而看到b1的信息

```

为避免冲突：

1. 先在本地main，pull远端main，同步远端最新代码到本地
2. 再在本地b1，合并main检测是否冲突，
3. 不冲突，则在本地main，merge b1，push到远端main

注：最开始要在主分支上新建分支进行工作，推送到远端（自己分支）

```bash
git branch [-a] //查看本地分支
#创建分支
git checkout -b [branch-name]
#切换分支
git checkout [branch-name]
#执行推送(第一次)
git push origin [branch-name]
#合并出现冲突，想要终止合并
git merge --abort

```



pr（pull request），即拉取请求，是开发者向项目仓库提交代码修改的请求，当在自己分支上做了修改后，发起一个pr，要求将这些修改合并到主分支

```bash
.gitignore  #忽略不想上传的文件
#若文件已上传至远端
git rm --cache src/b1.md

#.gitignore
src/b1.md
```



commit规范

```bash
# 添加了用户登录功能，提交信息遵循 feat 类型
git commit -m "feat(auth): 添加用户登录功能"

# 修复支付页面显示错误，提交信息遵循 fix 类型
git commit -m "fix(payment): 修复支付页面错误"

# 更新了 README 文件，加入了新的安装说明，提交信息遵循 docs 类型，documentation，补充注释，添加api
git commit -m "docs(readme): 更新安装和运行说明"

# 重构了用户数据处理逻辑，代码结构更清晰，提交信息遵循 refactor 类型
git commit -m "refactor(api): 重构用户数据处理逻辑"

# 为用户登录功能添加了单元测试，提交信息遵循 test 类型
git commit -m "test(unit): 增加用户登录的单元测试"

# 修改了首页标题的样式，提交信息遵循 style 类型
git commit -m "style(header): 调整首页标题样式"

# 修复了查询数据库时的性能瓶颈，提交信息遵循 perf 类型
git commit -m "perf(api): 优化数据库查询性能"

# 更新了构建脚本以支持新的部署流程，提交信息遵循 chore 类型
git commit -m "chore(build): 更新构建脚本以支持新的部署流程"

# 解决了登录失败时的提示信息问题，提交信息包含关联的 bug 编号，遵循 fix 类型
git commit -m "fix(auth): 修复登录失败时的错误提示 (#123)"

# 合并了新功能分支到开发分支，提交信息遵循 merge 类型
git commit -m "merge: 将 feature/login 分支合并到 develop"

```





## 建立ssh连接

✅ 步骤一：确认你本地有 SSH key

打开终端（VSCode 中的终端或 Git Bash）：

```bash
ls ~/.ssh
```

如果看到类似 `id_rsa` 和 `id_rsa.pub` 的文件，说明你已经有 SSH key，可以跳过这一步。如果没有，请运行：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

按回车即可，默认路径会保存在 `~/.ssh/id_rsa`

------

✅ 步骤二：把 SSH 公钥添加到 GitHub

运行这个命令查看你生成的 **公钥**：

```bash
cat ~/.ssh/id_rsa.pub
```

复制输出的内容，然后：

1. 登录 GitHub
2. 点击右上角头像 → `Settings` → `SSH and GPG keys`
3. 点击 **New SSH key**
4. 填个名字，粘贴公钥，保存

------

✅ 步骤三：测试 SSH 是否连接成功

```bash
ssh -T git@github.com
```

首次会提示是否信任，输入 `yes`。如果看到：

```
Hi your_username! You've successfully authenticated, but GitHub does not provide shell access.
```

说明 SSH 配置成功！

------

✅添加远程仓库

你需要运行下面这行命令，添加你 GitHub 仓库的地址作为远程：

```
git remote add origin git@github.com:lxy123hh/learnjs.git
```

上面这个 SSH 地址是你 GitHub 上仓库页面提供的，确认无误。

然后运行：

```bash
git push  origin main
```

解释：

- `origin` 是你远程仓库的默认别名
- `main` 是你当前分支的名字
- `-u` 表示 **设置默认上游分支**，以后只用 `git push` 就行了



## 切换http为ssh连接

✅ 一、生成 SSH 密钥（如果你之前没生成过）

✅ 二、将 SSH 公钥添加到 GitHub

1. 打开 GitHub → 点击右上角头像 → Settings
2. 左侧点击 **SSH and GPG keys**
3. 点击 “**New SSH key**”
4. Title 可自取，如 “MyLaptop”
5. 把 `id_ed25519.pub` 内容复制进去

```bash
cat ~/.ssh/id_ed25519.pub
```

------

✅ 三、修改 Git 远程地址为 SSH 格式

你当前使用的是 HTTP 形式，例如：

```bash
https://github.com/yourname/yourrepo.git
```

可以改为 SSH：

```bash
git@github.com:yourname/yourrepo.git
```

具体命令：

```bash
git remote -v   # 查看当前远程地址名（通常是 origin）

git remote set-url origin git@github.com:yourname/yourrepo.git
```

------

✅ 四、测试 SSH 是否连接成功

```bash
ssh -T git@github.com
```

如果是第一次，会提示你是否信任 GitHub，输入 `yes`。

成功时会显示：

```
Hi yourname! You've successfully authenticated, but GitHub does not provide shell access.
```









# 环境

* vscode
* tabnine  ai提示
* auto close tag 自动闭合标签
* auto rename tag 自动命名标签
* chinese 中文包
* html css support支持智能提示
* Prettier 代码格式化
* remote ssh 用来远程登陆服务器
* todo highlight 
* vscode-icons
* vue-official ，vue官方插件
* live server
* todo tree
* SCSS IntelliSense
* 下载windows字体到C:\Windows\Fonts（https://github.com/adobe-fonts/source-code-pro）

![image-20250330192534476](/frontend.assets/image-20250330192534476.png)

滚轮放大

![image-20250330192709288](/frontend.assets/image-20250330192709288.png)

Terminal.integrated.fontFamily

![image-20250330195152077](/frontend.assets/image-20250330195152077.png)

# html

 ```html
 <head> 中存放元数据（Metadata）是描述数据的数据，他不直接显示在网页上，但对页面的表现、功能以及搜索引擎优化（SEO）等方面非常重要，其中 <meta> 标签就是用来添加元数据的 ；<title>存放网页名，<script>加载js脚本文件，<style>加载css文件， <link>加载外部资源
 ```

eg:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> <!-- 指定网页的字符编码 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- 设置响应式网页的视口 -->
    <meta name="description" content="这是一个示范网页，包含HTML和CSS的基础知识。"> <!-- 描述网页内容 -->
    <meta name="keywords" content="HTML, CSS, 教程, 学习"> <!-- 网页的关键词 -->
    <meta name="author" content="张三"> <!-- 网页的作者信息 -->
    <title>HTML示范页面</title> <!-- 网页标题 -->
</head>
<body>
    <h1>欢迎学习HTML！</h1>
</body>
</html>


## DOM

DOM 的全称是 **Document Object Model**（文档对象模型）。

DOM 树是指 **DOM** 以树形结构表示文档的方式，其中每个节点代表文档中的一个部分，通常分为以下几种类型：

1. **文档节点**（Document Node）：这是整个HTML或XML文档的根节点。
2. **元素节点**（Element Nodes）：每个HTML标签（如`<div>`、`<p>`）都被表示为元素节点。
3. **属性节点**（Attribute Nodes）：HTML元素的属性（如`id="header"`）在DOM中作为属性节点。
4. **文本节点**（Text Nodes）：元素中的文本内容是文本节点。
5. **注释节点**（Comment Nodes）：HTML文档中的注释也会被表示为注释节点。

DOM树的特点：

- **树形结构**：DOM树的根节点是文档本身，每个元素节点作为树中的子节点，而元素节点之间的嵌套关系则表现为父子节点的关系。
- **层次结构**：通过树形结构的父子关系，DOM模型能清晰地表示页面的结构与层级关系。
- **可操作性**：开发者可以通过 JavaScript 操控 DOM 树，动态修改页面内容、结构或样式，或响应用户事件。

例如，在一个简单的HTML页面中：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>我的网页</title>
  </head>
  <body>
    <h1>欢迎来到我的网页</h1>
    <p>这是一个简单的网页。</p>
  </body>
</html>
```

对应的DOM树大概如下：

```
Document
├── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── p
```

在这棵树中：

- `html` 是根节点，
- `head` 和 `body` 是 `html` 的子节点，
- `title` 是 `head` 的子节点，
- `h1` 和 `p` 是 `body` 的子节点。



DOM 抽象化了 HTML 或 XML 文档，将其转化为一个可以通过编程语言操作的对象模型。在没有 DOM 的情况下，开发者只能通过修改静态文件来改变网页内容，而 DOM 提供了一种动态操作网页的方式，即对外提供的api。



当浏览器加载网页时，它会做以下几步来生成 DOM 树：

- **解析HTML**：浏览器读取 HTML 文件中的文本并开始解析。它会识别 HTML 标签、属性、文本内容等。
- **构建DOM树**：浏览器根据 HTML 内容构建 DOM 树。每个HTML标签、文本节点、属性等都会成为DOM树中的一个节点。浏览器将整个文档结构以树形结构组织起来。
- **渲染页面**：一旦 DOM 树完成，浏览器会根据 DOM 树来计算样式、布局和最终的渲染。页面就可以呈现给用户。



一旦 DOM 树被构建，浏览器会将它暴露给 JavaScript，这使得开发者能够：

- 读取页面内容；
- 动态修改内容，比如修改文本、增加或删除元素；
- 响应用户的交互，如点击按钮时动态更新页面。

例如，使用 JavaScript 可以通过以下方式访问并修改页面内容：

```javascript
document.querySelector('h1').textContent = 'Hello, JavaScript!';
```

这个代码会修改 `<h1>` 标签中的文本，变成 "Hello, JavaScript!"。

通过id获取元素

![image-20250401163507502](/frontend.assets/image-20250401163507502.png)

DOM 提供了一种动态交互方式，使得 CSS 和 JavaScript 可以协同工作：

- **CSS** 可以通过选择器作用于 DOM 中的元素，应用样式；
- **JavaScript** 可以通过 DOM 操作方法来访问、修改 DOM 元素，并响应事件。



为什么有 DOM 这个概念？

- **标准化操作**：浏览器之间可能有不同的实现，但 DOM 提供了一个标准化的接口，保证了开发者可以在不同浏览器中一致地操作文档。
- **动态性**：随着网页的复杂度增加，用户交互需求增加，DOM 提供了一个动态操控页面的能力。这种能力使得现代网页应用得以提供互动性和实时更新的内容。
- **与前端技术兼容**：DOM 作为前端开发的核心，能够与 JavaScript 和 CSS 配合，构建现代网页应用。



## BOM

BOM（Browser Object Model，浏览器对象模型）是浏览器中一组对象的集合，提供了一些用于与浏览器本身交互的接口，用于与浏览器本身进行交互，而不仅仅是操作网页的内容。与 DOM 专注于文档的内容和结构不同，BOM 关注的是浏览器窗口、历史记录、地址栏、浏览器大小、用户代理等与浏览器本身相关的部分。

BOM 为开发者提供了一个与浏览器窗口相关的接口，使得 JavaScript 能够控制浏览器本身的功能，比如：

- 控制浏览器窗口大小和位置；
- 操作浏览器历史记录；
- 获取浏览器信息；
- 处理浏览器的 URL 地址。

BOM 没有一个标准，它并不像 DOM 那样是一个标准化的模型，BOM 的实现和可用对象在不同的浏览器之间可能会有所不同。然而，大部分现代浏览器都实现了类似的 BOM 接口。

BOM 的主要组成部分：

1. **window 对象**：`window` 是 BOM 的核心对象，代表浏览器窗口本身。它是全局对象，所有的全局变量、函数、事件处理程序等都属于 `window` 对象。
   - `window.location`：表示浏览器的当前 URL，允许你获取或修改浏览器的地址。
   - `window.alert()`：弹出警告框。
   - `window.setTimeout()` 和 `window.setInterval()`：分别用于设置定时器和间隔器。
   - `window.console`：用于打印调试信息到浏览器的控制台。
2. **navigator 对象**：`navigator` 提供有关浏览器和操作系统的信息。
   - `navigator.userAgent`：获取浏览器的用户代理字符串。
   - `navigator.language`：获取浏览器的语言设置。
   - `navigator.platform`：获取操作系统平台信息。
3. **screen 对象**：`screen` 提供有关显示设备的信息，如显示器的宽度和高度。
   - `screen.width` 和 `screen.height`：获取屏幕的宽度和高度。
   - `screen.availWidth` 和 `screen.availHeight`：获取屏幕可用区域的宽度和高度（不包括任务栏等占用空间）。
4. **location 对象**：`location` 用来获取和操作浏览器的 URL 地址。它是 `window` 对象的一个属性。
   - `window.location.href`：获取当前页面的 URL，或者用来跳转到新的 URL。
   - `window.location.reload()`：重新加载当前页面。
   - `window.location.replace()`：加载一个新的 URL，替代当前历史记录。
5. **history 对象**：`history` 提供了对浏览器历史记录的访问。
   - `window.history.back()`：返回上一页。
   - `window.history.forward()`：前进到下一页。
   - `window.history.go()`：根据给定的偏移量进行浏览器历史记录的前进或后退。
6. **document 对象**：虽然 `document` 是 DOM 的一部分，但它也可以被视为 BOM 的一部分，因为它允许你操作页面内容和结构。它通过 `window.document` 访问。



BOM 相关功能

1. **窗口控制**： 通过 `window` 对象，JavaScript 可以打开、关闭或移动浏览器窗口。例如：
   - `window.open()`：打开一个新的浏览器窗口或标签页。
   - `window.close()`：关闭当前浏览器窗口。
2. **访问浏览器信息**： `navigator` 对象提供了对浏览器的访问，允许开发者获取浏览器类型、版本、操作系统等信息。比如：
   - `navigator.userAgent`：可以用来检测浏览器类型，例如 Chrome、Firefox 或 Safari。
3. **控制浏览器地址栏**： `window.location` 允许 JavaScript 操作浏览器的地址栏，改变页面的 URL，或者重新加载页面。
   - 例如：`window.location.href = 'https://www.example.com'` 会导航到指定的URL。
4. **访问屏幕信息**： `screen` 对象提供了屏幕的相关信息，如屏幕分辨率，帮助开发者适应不同的设备尺寸。例如：
   - `screen.width` 获取屏幕的宽度。
5. **历史记录控制**： `history` 对象允许访问浏览器的历史记录，实现页面的前后跳转。
   - 例如：`window.history.back()` 会让浏览器回到上一页。





## html标签

### **1. 文本标签**

**`<h1>` 到 `<h6>` 标签**

```bash
<h1 id="main-title" class="header">这是一级标题</h1>
<h2 class="sub-header">这是二级标题</h2>
```

- **常见属性**：
  - `id`：指定元素的唯一标识符。
  - `class`：为元素指定一个或多个类名。
  - `style`：为元素指定内联样式。

------

**`<p>` 标签** 
paragraph，段落，包裹文本

```bash
<p class="text-paragraph" style="font-size: 16px;">这是一个段落。</p>
```

- **常见属性**：
  - `class`：指定该段落的类名。
  - `style`：为段落设置内联 CSS 样式。

------

**`<strong>` 标签**

```html
<strong>加粗文本</strong>
```

- **常见属性**：无。

------

**`<em>` 标签**

```html
<em>斜体文本</em>
```

- **常见属性**：无。

------

**`<br>` 标签**

break，换行标签

```html
<p>第一行文本<br>第二行文本</p>
```

- **常见属性**：无。

------

### **2. 链接和媒体标签**

**`<a>` 标签**  

anchor锚点，链接url

```bash
<a href="https://www.example.com" target="_blank" title="点击访问 Example" class="link">访问 Example</a>
```

- **常见属性**：
  - `href`：指定链接的目标 URL。
  - `target`：指定链接的打开方式，`_blank` 会在新窗口中打开链接。
  - `title`：鼠标悬停时显示的提示文本。
  - `class`：指定元素的样式类。

------

**`<img>` 标签**

```bash
<img src="image.jpg" alt="图片描述" width="500" height="400" class="image-class">
```

- **常见属性**：
  - `src`：指定图片路径。
  - `alt`：图片无法加载时显示的替代文本。
  - `width` 和 `height`：设置图片的宽度和高度。
  - `class`：指定图片的样式类。

------

**`<audio>` 标签**

```bash
<audio controls>
  <source src="audio.mp3" type="audio/mp3">
  您的浏览器不支持音频播放。
</audio>
```

- **常见属性**：
  - `controls`：为音频元素添加控件。
  - `src`：指定音频文件的路径。
  - `type`：指定音频的 MIME 类型。

------

**`<video>` 标签**

```bash
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

<video width="1520" height="640" controls>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

```

- **常见属性**：
  - `controls`：为视频添加控件。
  - `src`：指定视频文件的路径。
  - `width` 和 `height`：指定视频的宽度和高度。
  - 自动播放autoplay时必须要静音muted

------

### **3. 表单标签**

**`<form>` 标签**

表单是一个非常重要的 HTML 元素，它允许用户在网页上输入数据，并将这些数据提交到服务器进行处理。表单的主要用途包括用户注册、登录、搜索、填写调查问卷等。

```bash
<form action="/submit" method="POST" target="_self">
  <input type="text" name="username" placeholder="请输入用户名">
  <button type="submit">提交</button>
</form>

<form action="submit_page.php" method="POST">
  <!-- 表单元素 -->
  <input type="text" name="username" placeholder="请输入用户名">
  <input type="password" name="password" placeholder="请输入密码">
  <button type="submit">提交</button>
</form>

```

- **常见属性**：
  - `action`：指定表单数据提交的 URL。当用户填写表单并点击提交时，数据会发送到 `action` 属性指定的地址。
  - `method`：表单提交的方式（如 `GET`, `POST`）。
  - `target`：指定提交结果显示的目标（如 `_self`, `_blank`）。

------

**`<input>` 标签**

```bash
<input type="text" name="username" value="默认值" placeholder="请输入用户名" required>
<input type="radio" name="gender" value="male" checked> 男
<input type="radio" name="gender" value="male" checked> 女
<input type="checkbox" name="subscribe"> 订阅
```

- **常见属性**：
  - `type`：指定输入框的类型（如 `text`, `password`, `checkbox`，`file`）。
  - `name`：指定表单提交时字段的名称。一样是是为一组，互斥关系
  - `value`：输入框的值。
  - `placeholder`：输入框的占位符文本。
  - `required`：表示字段为必填项。
  - `checked`：默认选中（仅用于 `checkbox` 和 `radio`）。

------

**`<button>` 标签**

```bash
<button type="submit" name="submitBtn" value="提交表单" class="btn-primary">提交</button>
```

- **常见属性**：
  - `type`：按钮类型（如 `submit`, `reset`, `button`）。
  - `name`：按钮的名称。
  - `value`：按钮的值，通常与表单一起提交。

------

**`<select>` 和 `<option>` 标签**

```bash
<select name="country">
  <option value="USA">美国</option>
  <option value="CN">中国</option>
</select>
```

- **常见属性**：
  - `name`：定义表单中字段的名称。
  - `value`：为每个选项指定值。
  - `selected`：指定默认选中的选项。

------

### **4. 表格标签**

**`<table>` 标签**

```bash
<table border="1" cellpadding="5" cellspacing="0">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>25</td>
  </tr>
</table>
```

- **常见属性**：
  - `border`：设置表格的边框。
  - `cellpadding`：设置单元格内容与单元格边框之间的间距。
  - `cellspacing`：设置单元格之间的间距。

------

**`<tr>`、`<th>`、`<td>` 标签**

table row,table header,table data

```bash
<tr>
  <th>标题1</th>
  <th>标题2</th>
</tr>
<tr>
  <td>数据1</td>
  <td>数据2</td>
</tr>
```

- **常见属性**：无。

------

### **5. 元标签**

**`<meta>` 标签**

```bash
<meta charset="UTF-8">
<meta name="description" content="这是网页的描述">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- **常见属性**：
  - `charset`：指定网页的字符集。
  - `name` 和 `content`：用于指定元信息的名称和值（如 `description`, `viewport`）。
  - `http-equiv`：设置类似于 HTTP 头部的元信息。

------

**`<link>` 标签**

```bash
<link rel="stylesheet" href="styles.css" type="text/css">
```

- **常见属性**：
  - `rel`：指定链接关系（如 `stylesheet`）。
  - `href`：指定外部文件路径。
  - `type`：指定文件的 MIME 类型。

------

### **6. 其他常见标签**

**`<div>` 标签** 

division容器，方便包括其他元素

```bash
<div id="container" class="box" style="background-color: #f0f0f0; padding: 10px;">
  内容区域
</div>
```

- **常见属性**：
  - `id`：指定唯一标识符。
  - `class`：为元素指定一个或多个类名。
  - `style`：为元素指定内联样式。

**`<span>` 标签**

```bash
<span class="highlight">文本高亮</span>
```

- **常见属性**：
  - `class`：为元素指定一个或多个类名。

**`<iframe>` 标签**

```bash
<iframe src="https://www.example.com" width="600" height="400" frameborder="0"></iframe>
```

- **常见属性**：
  - `src`：指定嵌套文档的 URL。
  - `width` 和 `height`：设置 `iframe` 的宽度和高度。
  - `frameborder`：设置边框（`0` 为无边框）。



**`<ul>` 标签** - 无序列表（Unordered List）

```bash
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
```

- **常见属性**：
  - `type`：指定无序列表的项目符号类型（在某些浏览器中支持），常见值有 `circle`（圆形）、`square`（方块）等。默认情况下，浏览器使用圆点作为项目符号。

------

**`<ol>` 标签** - 有序列表（Ordered List）

```bash
<ol>
  <li>第一步</li>
  <li>第二步</li>
  <li>第三步</li>
</ol>
```

- **常见属性**：
  - `type`：定义数字或字母的编号类型。常见值有：
    - `1`：数字（默认）。
    - `A`：大写字母（A, B, C, ...）。
    - `a`：小写字母（a, b, c, ...）。
    - `I`：大写罗马数字（I, II, III, ...）。
    - `i`：小写罗马数字（i, ii, iii, ...）。
  - `start`：设置开始的编号值。例如，`start="5"` 会从 5 开始编号。

------

**`<li>` 标签** - 列表项（List Item）

```bash
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<ol>
  <li>第一步</li>
  <li>第二步</li>
  <li>第三步</li>
</ol>
```

- **常见属性**：

  - `value`：对于有序列表，`<li>` 可以指定具体的值来覆盖默认的顺序编号。例如：

    ```html
    <ol>
      <li value="5">第五步</li>
      <li>第六步</li>
    </ol>
    ```

    上述代码中的第一个列表项会显示为 `5`，第二项会继续显示为 `6`，以此类推。

所有输入组件，都有disabled状态 

**SVG**（Scalable Vector Graphics，**可缩放矢量图形**）是一种基于 XML（可扩展标记语言）的图形格式，用于创建二维矢量图形。它广泛应用于网页设计和开发中，用来绘制图形、图标、动画等。与传统的位图图像（如 JPEG 或 PNG）不同，SVG 使用矢量图形来表示图像，这使得它可以无损缩放，适用于高分辨率显示设备。体积小，适合高效加载和响应式设计。主要用于icon

`<canvas>` 是 HTML5 中引入的一个非常强大的元素，它允许在网页上通过 JavaScript 绘制图形、图像、动画和其他可视内容。通过 `<canvas>`，开发者可以在页面上动态地绘制图形，创建游戏、绘制数据图表、实现图像编辑器等功能。





# CSS

参考文档

* https://elrumordelaluz.github.io/csshake/
* https://animate.style/

最重要的是布局

css可以写在：内联写法（实践中不允许写）；head中style标签中；外部css用link引用；import指令(要放在style最前面）。优先级就近原则

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .first {
            color: red;
        }
    </style>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div class='first'>类选择器</div>
    <div style="color: red;">内联写法</div>
    <div class="out">外部写法</div>
</body>
</html>


#style.css,注：没有逗号
.out {
    color: green 
}
```



* 选择器，大量的键值对：{color:red}
  * 类class选择器（最主要）（次高）
  * 标签选择器（低） 
  * id选择器，id不能以数字开头#（优先级最高）
  * 通配符选择器*（优先级最低）





```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .first {
            color: red;
        }
        p {
            color: green;
        }
        #test_id {
            color: blue;
        }
        * {
            margin: 0;
        }
    </style>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div class = 'first'>类选择器</div>
    <p>这是一段文本</p>
    <div id="test_id">id选择器</div>
</body>
</html>
```



* * 后代选择器

```html
# 取所有子集，两层都黄
div p {
	color:yellow;
}

#取第一层子集，第一层黄
div > p {
	color:yellow;
}

<div>
	<p>第一层</p>
	<span><p>第二层</p></span>
</div>
```

 

* * 伪类选择器，:root 与html标签等效；[选择器]:hover

  * 伪元素选择器 ，[选择器]::after 

    ```css
    p {
    	color: green;
    
    }
    # 鼠标位于p上的效果
    p:hover {
    	color: aqua;
    	cursor: pointer;  # 通常搭配使用
    }
    
    //默认before和after均为行内元素
    [选择器]:after {
    	content: "在元素末尾增加一些内容";
    }
    [选择器]:before {
    	content:'在元素前面增加一些内容';
    }
    ```

    

css隔离方案：属性选择器，框架自带



## 盒子模型

###  **盒子模型**

（Box Model）是网页布局中最重要的概念之一。在 CSS 中，所有的 HTML 元素都可以看作一个盒子，盒子模型定义了如何计算元素的尺寸、边距、边框和内边距。



一个元素的盒子模型由以下几个部分组成（从内到外）：

1. **内容区域**（Content）：元素的实际内容，如文本、图片等。
2. **内边距**（Padding）：内容与边框之间的空间。内边距是透明的，背景色也会扩展到内边距区域。
3. **边框**（Border）：围绕内容和内边距的边框，可以设置边框的宽度、颜色和样式。
4. **外边距**（Margin）：元素与其他元素之间的空间。外边距是透明的，不受背景色的影响。

```
+----------------------------+
|        外边距 (Margin)      |
|  +----------------------+   |
|  |      边框 (Border)   |   |
|  |  +----------------+  |   |
|  |  |  内边距 (Padding) |  |   |
|  |  |  +----------+    |  |   |
|  |  |  | 内容区域     |    |  |   |
|  |  |  | (Content)    |    |  |   |
|  |  |  +----------+    |  |   |
|  |  +----------------+  |   |
|  +----------------------+   |
+----------------------------+
```

1. **内容区域 (Content)**

这是元素的实际内容区，包含文本、图像等内容。例如，`<div>` 标签中可能包含文本或其他 HTML 元素。

2. **内边距 (Padding)**

内边距是内容区域与元素的边框之间的空白区域。内边距可以分别设置上、右、下、左的值。

pixer像素

```css
div {
  padding: 20px; /* 所有四个方向的内边距为 20px */
}
```

3. **边框 (Border)**

边框围绕在内边距之外，并且可以通过 `border-width`、`border-color` 和 `border-style` 来控制。

```css
div {
  border: 1px solid black; /* 边框宽度 5px，颜色为黑色，样式为实线 最常用*/
  border_style:solid; /*单独设置*/
  border_color:red;
}
```

4. **外边距 (Margin)**

外边距是元素与其他元素之间的空白区域。外边距用于控制元素之间的间距。外边距不会影响元素的背景色。

```css
div {
  margin: 30px; /* 所有四个方向的外边距为 30px */
  margin: 1px 1px; /* 上下  左右 */
  margin: 1px 1px 1px 1px; /* 上右下左 */
  
}
```



宽高

```css
width:1px;
height:10%;
width:calc(100% - 10px); #动态计算
```



### **内联盒子**

（Inline Box）是 HTML 和 CSS 中的一个概念，它描述了某些元素的显示行为，特别是如何与其他元素在一行内排布。内联元素与块级元素（block-level elements）有所不同，主要体现在它们的布局、尺寸和占用空间方式。



内联元素（Inline Elements）

内联元素是指不会开始新的一行的元素。与块级元素不同，内联元素的宽度和高度仅取决于其内容，而不占据整行的宽度。

特点：

1. **不强制换行**：内联元素不会独占一行，它们与其他内联元素或者块级元素放在同一行中，直到该行的空间用完。
2. **宽度和高度由内容决定**：内联元素的宽度和高度是由其内容决定的，无法直接设置宽度或高度（即使设置了宽度和高度，效果也可能不明显）。
3. **上下边距不可用**：对于内联元素，设置上下的 `margin` 或 `padding` 通常不会影响它们的布局，只能通过左右的 `margin` 和 `padding` 来调整。

常见的内联元素

- `<span>`：一个非常常见的内联元素，用于包装文档中的一部分内容，通常不会影响页面的布局。
- `<a>`：超链接元素，默认是内联的。
- `<strong>`：加粗文本，默认是内联元素。
- `<em>`：斜体文本，默认是内联元素。

内联盒子的行为

内联盒子指的就是这些 **内联元素** 的盒子模型。它们在页面中呈现为一个内联的元素盒子，尺寸（宽度和高度）通常是由它的内容决定的。内联元素的盒子模型与块级元素的盒子模型不同，内联元素不会占用整个父容器的宽度，而是只占用它所需要的空间。

举个例子：

```html
<p>这是一个 <span>内联</span> 元素的例子。</p>
```

在这个例子中：

- `<p>` 是一个块级元素，它会占据一整行。
- `<span>` 是内联元素，它不会强制换行，并且只占据它包含内容的宽度。

如何把块级元素转换为内联元素？

使用 `display` 属性，可以将一个块级元素转换为内联元素。通过设置 `display: inline`，一个块级元素就会变成一个内联元素。常见的例子包括将 `<div>` 元素变为内联元素：

```css
div {
  display: inline;
}
```

这样，`<div>` 就变成了内联元素，它会和其他内联元素（如 `<span>` 或 `<a>`）在同一行上排列。

如何设置内联元素的宽度和高度？

内联元素默认不能设置宽度和高度，但你可以通过设置 `display: inline-block` 来让内联元素拥有类似于块级元素的特性，从而可以控制它的宽度和高度。

```css
span {
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: lightblue;
}
```

在这个例子中，`<span>` 元素被设置为 `inline-block`，它就可以像块级元素一样设置宽度和高度，同时仍然保持内联元素的排列方式。



## overflow

1. 文本超出固定框的长度：使用text-overflow:ellipsis，同时需满足1.包裹文字的容器要有确定的宽度，且不能是百分比宽度 2. 必须同时设置两个属性：overflow:hidden 和 white-space:noswrap。同时满足后超出部分为省略号

**`white-space`**：设置文本是否在一行内显示，常用的值为 `nowrap`，确保文本在单行内不换行。如果你希望文本超出容器时能被截断，必须使用 `nowrap`。

**`overflow`**：设置如何处理内容溢出，常用值为 `hidden`，这会将溢出的文本隐藏起来。

**`text-overflow`**：用于指定溢出文本的表现方式，常用的值为 `ellipsis`（省略号）或 `clip`（裁剪）。

```html
.long-text {
	border: 1px solid red;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 200px;
}
<div class="long-text">
	hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
</div>
```

![image-20250404152829050](/frontend.assets/image-20250404152829050.png)



2. 块与块之间的overflow，与滚动条有关

```css
 .container {
     width: 600px;
     height: 300px;
     margin: 40px;
     padding: 40px;
     border: 10px solid rgb(0, 81, 255);
     background-color: black;

}
.content {
    height: 400px; //超出了父级容器的高度
    background-color: red;
}


<div class="container" >
	<div class="content"></div>
</div>
```

<img src="/frontend.assets/image-20250404192229520.png" alt="image-20250404192229520" style="zoom:50%;" />

此时需要给父级容器加属性：overflow: scroll;overflow-y:scorll(横向)

<img src="/frontend.assets/image-20250404192342557.png" alt="image-20250404192342557" style="zoom:50%;" />

视图高度百分百问题，有滚动条，是因为有margin

```css
html  {
	margin: 0;
    height:100%;
}

body {
    height: clac(100% - 16px);
}
```





## flex布局

在前端开发中，`flex` 是一种非常强大的布局工具，它使得在不同屏幕尺寸下，设计和排版变得更容易。`flex` 布局属于 CSS3 的一部分，主要用于一维布局（横向或纵向）。只能应用于第一层子集。下面是一些常见的用法：

1. **基本用法**

首先，必须在父元素上设置 `display: flex` 或 `display: inline-flex`，这两者的区别在于，`flex` 使得父容器是一个块级元素，而 `inline-flex` 使得父容器是一个行内元素。

```css
.container {
  display: flex;
}
```

2. **设置主轴方向（`flex-direction`）**

`flex-direction` 用来指定主轴的方向。默认情况下，主轴是水平的（`row`）。常见的取值有：

- `row`：主轴水平（默认值）
- `column`：主轴垂直
- `row-reverse`：反向水平
- `column-reverse`：反向垂直

```css
.container {
  display: flex;
  flex-direction: column;  /* 主轴方向为垂直 */
}
```

3. **排列子项（`justify-content`）**

`justify-content` 用于控制子项在主轴上的对齐方式。常见的取值有：

- `flex-start`：默认值，左对齐（水平布局）或上对齐（垂直布局）
- `flex-end`：右对齐（水平布局）或下对齐（垂直布局）
- `center`：居中
- `space-between`：两端对齐，子项之间的间隔相等
- `space-around`：子项之间的间隔相等，且子项与父容器边缘的间隔也相等
- `space-evenly`：子项之间的间隔完全相等

```css
.container {
  display: flex;
  justify-content: center;  /* 水平居中 */
}
```

4. **排列子项在交叉轴上的对齐（`align-items`）**

`align-items` 用于控制子项在交叉轴（垂直轴，若主轴为水平）上的对齐方式。常见的取值有：

- `flex-start`：对齐到交叉轴的起点
- `flex-end`：对齐到交叉轴的终点
- `center`：居中
- `baseline`：对齐到子项的基线
- `stretch`：拉伸（默认值）

```css
.container {
  display: flex;
  align-items: center;  /* 垂直居中 */
}
```

5. **多行布局（`flex-wrap`）**

默认情况下，`flex` 布局是单行的，如果子项超过父容器的宽度，子项会被压缩到一行内。可以使用 `flex-wrap` 来允许子项换行。

- `nowrap`（默认值）：不换行
- `wrap`：换行
- `wrap-reverse`：反向换行

```css
.container {
  display: flex;
  flex-wrap: wrap;  /* 允许换行 */
}
```

6. **设置子项的大小（`flex-grow`, `flex-shrink`, `flex-basis`）**

- `flex-grow`：设置子项如何扩展，值越大，子项占据的空间越大
- `flex-shrink`：设置子项如何缩小，值越大，子项缩小的空间越多
- `flex-basis`：设置子项的初始大小

这三者可以简写为 `flex` 属性：

```css
.item {
  flex: 1;  /* 相当于 flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
}
```

7. **子项对齐（`align-self`）**

有时，我们需要让某些子项和其他子项在交叉轴上的对齐方式不同，可以使用 `align-self` 属性来单独设置子项的对齐方式。

```css
.item {
  align-self: flex-start;  /* 单个子项对齐到交叉轴的起点 */
}
```

8. **嵌套 Flex 布局**

Flex 布局不仅可以应用于一个父元素和它的子元素，还可以嵌套使用。在这种情况下，子容器也可以使用 `display: flex` 来进行布局。

```css
.container {
  display: flex;
}

.item {
  display: flex;  /* 嵌套的子元素也可以使用 flex 布局 */
}
```

9. **自适应布局**

Flex 布局在响应式设计中非常有用，它能够帮助你轻松创建自适应的布局。

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 200px;  /* 每个子项都能根据需要缩放，最低宽度为 200px */
}
```







为防止主色调需要变动，使用变量进行颜色定义

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        :root {
              --primary-color:#ff0000; 
        }

        .title {
            color: var(--primary-color);
        }
    </style>
</head>
<body>
    <div class="title">的爱的发声刚刚流口水支持效率你</div>
</body>
</html>
```

兼容性，前面加-webkit-



边界变圆：

```css
.title {
    color: var(--primary-color);
    height: 400px;
    width: 400px;
    border: 5px solid red;
    border-radius:50%;
}
```

`box-shadow` 是 CSS 属性，用于给元素添加阴影效果。它能够模拟物体的阴影，增强页面的立体感和层次感，常用于按钮、卡片、模态框等元素。

```css
/* 复制 */
box-shadow: h-offset v-offset blur spread color inset;
```

各个值的说明：

- **h-offset**：阴影相对于元素水平位置的偏移，单位可以是像素（px）、百分比（%）等。正值表示向右偏移，负值表示向左偏移。
- **v-offset**：阴影相对于元素垂直位置的偏移，单位可以是像素（px）、百分比（%）等。正值表示向下偏移，负值表示向上偏移。
- **blur**：模糊半径，定义阴影的模糊程度，数值越大阴影越模糊。可以省略，默认为 0（即没有模糊效果）。
- **spread**：扩展半径，定义阴影的扩展大小。数值为正时，阴影会扩展到元素外部；为负时，阴影会收缩。
- **color**：阴影的颜色，可以使用任何有效的颜色值，如 `#000`、`rgba(0, 0, 0, 0.5)`。
- **inset**：可选值，设置阴影为内阴影（嵌入元素内部），如果不加这个属性，默认是外阴影。

1. **简单阴影**：

   ```css
   box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.3);
   ```

   这段代码给元素添加了一个水平偏移 10px，垂直偏移 10px，模糊半径为 15px 的阴影，颜色为半透明的黑色。

2. **多重阴影**：

   ```css
   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(0, 0, 0, 0.2);
   ```

   这段代码给元素添加了两个阴影，一个向右下偏移，另一个向左上偏移，形成了双重阴影效果。

3. **内阴影**：

   ```css
   box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
   ```

   这段代码创建了一个内阴影效果，阴影会出现在元素的内部。

## 字体

* google font上引用
* 下载到本地使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style> 
        .title {
            font-family: 'dyh';
        }
        @font-face {
            font-family: 'dyh';  
            src: url(./assets/SmileySans-Oblique.ttf);
        }
    </style>
</head>
<body>
    <div class="title">得意黑</div>
</body>
</html> 
```



## 定位

让元素脱离默认文档流

在前端开发中，**定位（positioning）** 是 CSS 布局中非常重要的一部分。它决定了一个元素在页面上的显示位置。CSS 提供了几种不同的定位方式，主要包括 `static`、`relative`、`absolute`、`fixed` 和 `sticky`。

1. **`static`（默认定位）**

- **解释**：这是元素的默认定位方式，意味着元素会按照文档流进行排列。也就是说，它的位置由 HTML 代码的顺序决定。
- **特点**：无法使用 `top`、`right`、`bottom`、`left` 等属性进行偏移。

```css
.example {
  position: static;
}
```

2. **`relative`（相对定位）**

-  **解释**：元素相对于它在文档流中的**原始位置**进行定位。你可以使用 `top`、`right`、`bottom`、`left` 来偏移元素，但它仍然占据原来的空间。
- **特点**：相对定位后的元素不会脱离文档流，周围的元素不会受到影响。

```css
.example {
  position: relative;
  top: 20px;  /* 向下偏移 20px */
}
```

3. **`absolute`（绝对定位）**

- **解释**：元素相对于最近的 **定位元素**（即 `relative`、`absolute`、`fixed` 或 `sticky` 的父元素）进行定位。如果没有这样的定位祖先元素，则相对于 **`<html>`** 或 **`<body>`** 元素进行定位。
- **特点**：完全脱离文档流，元素的位置不会影响到其他元素的位置。你可以使用 `top`、`right`、`bottom`、`left` 进行精确控制。

```css
.parent {
  position: relative;  /* 设定父元素为定位元素 */
}

.child {
  position: absolute;
  top: 10px;   /* 距离父元素顶部 10px */
  left: 15px;  /* 距离父元素左侧 15px */
}
```

4. **`fixed`（固定定位）**

- **解释**：元素相对于浏览器的视口（即浏览器窗口）进行定位。即使页面滚动，元素的位置也不会改变。
- **特点**：脱离文档流，元素会固定在视口的某个位置，通常用于导航栏或浮动元素。

```css
.example {
  position: fixed;
  top: 0;
  left: 0;  /* 固定在页面的左上角 */
}
```

5. **`sticky`（粘性定位）**

- **解释**：`sticky` 定位是一种结合了 `relative` 和 `fixed` 的定位方式。元素在滚动到指定位置时会变得固定在页面上，直到父容器的边界被突破为止。常用于在滚动时固定头部导航条。
- **特点**：当元素滚动到某个位置时，它会变得“粘”在页面的某个位置，但它仍然在文档流中占据空间。

```css
.example {
  position: sticky;
  top: 0;  /* 页面滚动到距离顶部 0 时，元素将粘附在顶部 */
}
```

------

总结：

- **`static`**：默认，正常文档流。
- **`relative`**：相对定位，元素偏移，但仍占据空间。
- **`absolute`**：绝对定位，相对于最近的定位祖先元素，脱离文档流。
- **`fixed`**：固定定位，相对于视口，脱离文档流。
- **`sticky`**：粘性定位，滚动到指定位置时固定，脱离文档流，但在父容器内。

这些定位方式的使用场景各有不同，通常需要结合 `z-index` 来控制层级关系，达到理想的布局效果。









## 层叠关系与字体单位

 z-index，侧边栏或需要弹出的

* position中不能为static
* 父级需要大于另一个的父级（层叠上下文）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body {
        margin: 0px;
    }
    .block {
        height: 100px;
        width: 100px;


    }
    .blue {
        background-color: blue;
        position: relative;
        z-index:2 ;
    }
    .red {
        background-color: red;
        position: relative;
        bottom: 50px;
        left: 50px;
        z-index: 1;
    }
    .green {
        background-color: green;
        position: relative;
        bottom: 100px;
        left: 100px;
    }

</style>
<body>
    <div class="block blue"></div>
    <div class="block red"></div>
    <div class="block green"></div>
</body>
</html>
```

<img src="/frontend.assets/image-20250416141106707.png" alt="image-20250416141106707" style="zoom: 50%;" />





单位

1. `px` —— 绝对单位（像素）

- `px` 是 **绝对长度单位**，表示设备屏幕上的一个像素点（在普通屏幕下）。
- 在布局中使用 `px`，你会获得一个**固定的尺寸**，不会随字体、容器或页面缩放而变化。

✅ **适用场景**：像素精确的边框、图标、线条、某些固定布局。

❌ **缺点**：不易响应，尤其是在高分屏、放大页面或移动端时表现不好。

------

2. `em` —— 相对于**当前元素字体大小**

- `1em` 的长度等于当前元素 `font-size` 的值。
- 用在字体大小时是相对于**父元素的字体大小**，用在其他属性时是相对于**当前元素的字体大小**。

例子：

```css
html {
  font-size: 16px;
}

p {
  font-size: 2em; /* = 32px */
}
```

**嵌套时会叠加！**

```css
.outer {
  font-size: 2em;   /* 相对于 html：2em = 32px */
}

.inner {
  font-size: 1.5em; /* 相对于 .outer：1.5 * 32 = 48px */
}
```

✅ **适用场景**：局部样式继承、想要字体跟随上下文放大缩小。

❌ **缺点**：嵌套太多会导致计算混乱。

------

 3. `rem` —— 相对于**根元素（html）的字体大小**

- `rem`（root em）是相对于 `<html>` 元素的 `font-size` 来计算的。
- 浏览器默认是 16px（除非你改了）。

例子：

```css
html {
  font-size: 16px;
}

h1 {
  font-size: 2rem; /* = 32px */
}
```

✅ **适用场景**：

- 响应式布局：配合媒体查询动态调整 `html` 的 `font-size`，整个页面大小就自动响应。
- UI 设计单位统一：比如你把 1rem 当成 10px 来设计，那就把 `html { font-size: 10px; }`

❌ **缺点**：比 `px` 稍微难理解一点点，但很值得用！

| 场景           | 推荐单位                                 |
| -------------- | ---------------------------------------- |
| 布局宽高、间距 | `rem`（统一缩放），或者 `px`（精确控制） |
| 字体大小       | `rem`（响应式更好）                      |
| 图标大小       | `em` 或 `rem`                            |
| 内边距/边框    | `rem` / `px` 均可，看需求                |

小技巧：响应式缩放方案

```css
/* 假设设计稿是 375px 宽 */
html {
  font-size: calc(100vw / 3.75); /* 1rem = 10px when 375px viewport */
}
```



要不要全用rem：

你这个问题问得很到位，很多人刚开始做响应式布局时都会想：“那我直接全用 `rem` 不就搞定了？”——**答案是：大方向没错，但要配合一些策略用才最舒服、最高效。**

 用 `rem` 做响应式布局的优点：

1. **全局统一缩放**：只要改动 `<html>` 的 `font-size`，所有用 `rem` 的地方就自动等比缩放，非常适合移动端。
2. **设计稿尺寸好还原**：比如设计稿宽 750px，我们就可以让 `1rem = 75px`，这样设计稿里的数值除以 75 就是你该写的 `rem` 值。
3. **配合媒体查询 / JS 动态设置更灵活**。

------

🧠 推荐做法（移动端开发中常用）

步骤一：用 JS 动态设置 `html` 的 `font-size`

```js
// 例：以设计稿宽度 375 为基准
(function () {
  const baseWidth = 375;
  const html = document.documentElement;
  const setFontSize = () => {
    const scale = html.clientWidth / baseWidth;
    html.style.fontSize = (scale * 16) + 'px'; // 16 是基准字体
  };
  window.addEventListener('resize', setFontSize);
  setFontSize();
})();
```

这样一来，在 375px 宽的设备上，`1rem = 16px`；在 750px 的设备上，`1rem = 32px`，页面就自适应了。

------

步骤二：页面样式都用 `rem`

```css
.container {
  padding: 1rem;
  font-size: 1.2rem;
  margin-top: 2rem;
}
```

------

⚠️ 注意点

| 用法                 | 建议                                             |
| -------------------- | ------------------------------------------------ |
| 字体、内边距、间距等 | ✅ 用 `rem`（方便统一缩放）                       |
| 边框线、精细 UI 控制 | 🟡 用 `px` 更准确，比如 `1px border`              |
| 布局                 | 看情况可以用 `%`、`flex`、`grid`，不是非得 `rem` |
| 圆角、阴影等装饰     | 📏 通常也用 `px`                                  |



因为有些东西 **不是你想缩就缩的**，比如：

- `1px` 的边框你用 `rem` 容易变厚。
- 一些小图标、线条等需要像素级精准控制的东西还是 `px` 好。
- 有些第三方组件/库默认使用 `px`，你全用 `rem` 可能还要 override。



- ✅ `rem` 是做响应式布局的强力武器，但不是万能钥匙。
- ✨ 最好的方案是：**布局、字体、间距用 rem**，**边框、装饰性细节用 px**，**配合媒体查询或动态设置 html 字体大小**。



## 动画和媒体查询

CSS 动画主要有两种形式：

| 类型                       | 用途                   | 典型场景                       |
| -------------------------- | ---------------------- | ------------------------------ |
| `transition`               | 状态变化之间的平滑过渡 | hover、点击、聚焦等            |
| `@keyframes` + `animation` | 控制一段连续动画过程   | 加载动画、循环效果、复杂动效等 |

------

 一、`transition`（过渡动画）

语法：

```css
transition: 属性名 时长 缓动函数 延迟时间;
```

示例：按钮放大 + 变色

```css
.button {
  padding: 10px 20px;
  background-color: #3498db;
  transition: all 0.3s ease; /* 动画控制点在这里 */
}

.button:hover {
  background-color: #e74c3c;
  transform: scale(1.1);
}
```

常见属性：

- `transition-property`: 哪些属性参与动画（`all`、`background-color` 等）
- `transition-duration`: 动画持续时间（如 `0.3s`）
- `transition-timing-function`: 动画曲线（如 `ease`、`linear`、`ease-in-out`）
- `transition-delay`: 延迟时间

------

🎞️ 二、`@keyframes`（关键帧动画）

用于描述一个动画在时间轴上每一阶段的样式状态。

语法：

```css
@keyframes mingzi {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
```

然后绑定它：

```css
.ball {
  animation: mingzi 1s infinite ease-in-out;
}
```

常用属性：

| 属性                        | 说明                                         |
| --------------------------- | -------------------------------------------- |
| `animation-name`            | 动画名字（对应 @keyframes）                  |
| `animation-duration`        | 持续时间                                     |
| `animation-timing-function` | 缓动函数                                     |
| `animation-delay`           | 延迟开始                                     |
| `animation-iteration-count` | 播放次数（`infinite` 表示无限循环）          |
| `animation-direction`       | 播放方向（如 `alternate` 来回播放）          |
| `animation-fill-mode`       | 动画结束后状态（如 `forwards` 保持最后一帧） |

------

示例：loading 动画

```css
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #ddd;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

------

✨ `transition` vs `animation` 对比

| 对比项       | `transition`             | `@keyframes + animation` |
| ------------ | ------------------------ | ------------------------ |
| 触发方式     | 依赖状态变化（如 hover） | 自动播放 / JS 触发       |
| 复杂程度     | 适合简单过渡             | 支持多阶段复杂动画       |
| 控制力       | 一定受限                 | 非常强                   |
| 是否支持循环 | ❌                        | ✅（用 `infinite`）       |

------

⚠️ 小提示

- 建议只对 `transform` / `opacity` 做动画，性能最好（不触发重排）。
- 避免对 `width` / `height` / `left` / `top` 动画，性能差。
- 想做 “页面进入动画” 时可以用 `animation-delay + animation-fill-mode: forwards`。

------

✅ 小结

| 想实现的效果           | 推荐用法                 |
| ---------------------- | ------------------------ |
| 按钮 hover 动效        | `transition`             |
| 循环 loading 圈        | `@keyframes + animation` |
| 页面加载动画           | `animation`              |
| 状态过渡（点击后变形） | `transition`             |
| 定时滑入滑出           | `animation`              |

------







媒体查询--做响应式布局，根据屏幕大小选择对应配置，不常用

```css
    @media screen and (max-width : 500px) {
        .second {
            width: 60px;
            height: 60px;
        }
    }

    @media screen and (min-width:500px) and (max-width:1080px) {
        .second {
            width: 100px;
            height: 100px;
        }
    }
    @media screen and (min-width:1080px) {
        .second {
            width: 120px;
            height: 120px;
        }
    }

    .second {
        /* width: 200px;
        height: 200px; */
        border-radius: 50%;
        animation: circle 3s linear infinite;
    }
```







# js

| 工具        | 作用                                                         | 依赖关系                                                     |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Node.js** | JavaScript 运行时环境，允许你在服务器或命令行运行 JavaScript 代码。 | 必须先安装 Node.js 才能使用 npm 和 pnpm。                    |
| **npm**     | Node.js 自带的包管理器，管理和安装 JavaScript 包。管理依赖。npm install [package]。所有的包都被托管在仓库npmjs.com | npm 是 Node.js 的一部分，安装 Node.js 时自动获得。           |
| **nvm**     | Node.js 版本管理器，允许你在同一台机器上安装和切换多个 Node.js 版本。 | `nvm` 不依赖于 npm 或 pnpm，但你可以用它来管理 Node.js 版本。 |
| **pnpm**    | 一个高效的 JavaScript 包管理器，替代 npm 提供更高性能和节省磁盘空间的安装方式。使用软链接切换版本后不需要重复下载包。管理依赖、管理版本。 | 使用 pnpm 代替 npm 来管理项目依赖，安装和运行 Node.js 包。   |



## 使用pnpm管理nodejs

常用14和16版本

进入powershell

```bash
#安装pnpm
iwr https://get.pnpm.io/install.ps1 -useb | iex
#重新打开命令行，查看pnpm版本号
pnpm -v
#安装lts版本的node
pnpm env use --global lts
#查看node版本号
node -v

#安装指定版本的node
pnpm env use --global 16

pnpm env list

```



## Sass

### Sass 是什么？

> **Sass 是 CSS 的增强版（预处理器）**，它让你写 CSS 更加高效、可维护、可复用。

Sass 最终会被编译成普通的 CSS 给浏览器使用，所以浏览器并不直接运行 Sass，而是运行它“翻译”出来的 CSS。

------

### Sass 的核心功能举例

| 功能   | 示例                                   | 说明                                 |
| ------ | -------------------------------------- | ------------------------------------ |
| 变量   | `$color: red;`                         | 就像 JS 的变量，统一管理颜色、间距等 |
| 嵌套   | `nav { ul { li { ... } } }`            | 类似 HTML 结构，写起来直观           |
| 混入   | `@mixin btn { ... }` / `@include btn;` | 类似函数，复用样式块                 |
| 运算   | `width: 100% / 3;`                     | 可以直接做数学计算                   |
| 模块化 | `@import 'header';`                    | 分文件写样式，最后合并编译           |

------

### Sass 有两种语法

| 语法名           | 后缀    | 说明                                          |
| ---------------- | ------- | --------------------------------------------- |
| SCSS             | `.scss` | 主流，和普通 CSS 一样的语法，加上 Sass 功能   |
| SASS（缩进风格） | `.sass` | 更简洁，不用大括号 `{}`，适合喜欢缩进写法的人 |

大多数人用的是 **`.scss`**。

------

### 用 Vue 项目时如何启用 Sass？

如果你用的是 Vite + Vue 项目，只要安装 Sass：

```bash
pnpm add -D sass
```

然后就可以在组件里写：

```vue
<style lang="scss" scoped>
$main-color: #42b983;

.button {
  background: $main-color;
  padding: 10px;
}
</style>
```



| 你的情况                         | 建议                                  |
| -------------------------------- | ------------------------------------- |
| 👶 初学者，刚学 Vue、CSS          | ✅ **建议先不用**，学好 CSS 基础最重要 |
| 🎯 项目变大了，样式很多，维护困难 | ✅ 用 Sass 会非常省心、强大            |
| 🧱 想写响应式、变量、组件样式     | ✅ Sass 非常适合这类开发               |
| 💼 团队/公司开发项目              | ✅ 几乎标配，能大大提高开发效率        |



```bash
pnpm install sass -g
```



配置环境变量

```bash
#查看路径
pnpm bin -g

#复制编辑
C:\Users\你的用户名\AppData\Local\pnpm
```

打开 Windows 的【环境变量】，把这个路径加入到系统的 `PATH` 变量中。

```bash
sass --version
```



需要先编译再使用

```bash
sass index.scss index.css
```

1. **变量（Variables）**

变量允许你存储 CSS 属性值，方便重复使用和修改。例如：

```scss
$primary-color: #3498db;  // 定义一个变量

body {
  color: $primary-color;  // 使用变量
}
```

变量可以存储颜色、字体、尺寸、甚至 CSS 选择器、混合宏等。

------

2. **嵌套（Nesting）**

Sass 允许你通过嵌套规则来书写 CSS，使得样式的结构更加清晰，类似于 HTML 结构的层级。

```scss
nav {
  ul {
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      color: darken($primary-color, 10%);  // 使用 Sass 函数
    }
  }
}
```

- **`&`** 符号表示父选择器，可以用于 `:hover`、`:active` 等伪类。

------

3. **Mixin（混合宏）**

Mixin 允许你创建可重用的样式代码块，可以传递参数，以便在多个地方使用。

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
         border-radius: $radius;
}

.box { 
  @include border-radius(10px);  // 使用 mixin
}
```

- 可以传递多个参数，还可以设置默认值。

------

4. **继承（Inheritance）**

Sass 允许一个选择器继承另一个选择器的样式。通过 `@extend` 语法，可以避免重复的样式。

```scss
.button {
  padding: 10px 15px;
  background-color: $primary-color;
}

.button-primary {
  @extend .button;  // 继承 .button 样式
  font-weight: bold;
}
```

这样 `.button-primary` 会继承 `.button` 的所有样式，同时可以添加或修改自己的样式。

------

5. **运算（Operations）**

Sass 支持数学运算，包括加、减、乘、除、求余等操作，适用于单位之间的计算。

```scss
$width: 100px;
$padding: 10px;

.container {
  width: $width - $padding;  // 计算宽度：100px - 10px
}
```

- 也可以在颜色、尺寸、甚至 `@mixin` 中使用这些运算。

------

6. **条件语句与循环（Control Directives）**

Sass 提供了条件语句和循环，可以根据不同的条件执行不同的样式逻辑。

条件语句：

```scss
$theme: light;

.button {
  @if $theme == dark {
    background-color: #333;
  } @else {
    background-color: #fff;
  }
}
```

循环：

```scss
@for $i from 1 through 5 {
  .item-#{$i} {
    width: 20px * $i;
  }
}
```

这里，`@for` 会生成 `.item-1`, `.item-2`, `.item-3` 等多个类。

------

7. **函数（Functions）**

Sass 允许你定义自己的函数，用于返回计算值，类似于 mixin，但更加注重返回值。

```scss
@function calculate-rem($px) {
  @return $px / 16px * 1rem;
}

p {
  font-size: calculate-rem(18px);  // 使用自定义函数
}
```

------

8. **导入（@import 和 @use）**

Sass 允许你将一个文件的内容导入到另一个文件中。`@import` 已被 `@use` 和 `@forward` 替代，后者更现代且更加模块化，避免了命名冲突。

```scss
// style.scss
@use 'variables';  // 导入另一个 Sass 文件

body {
  background-color: variables.$background-color;
}
```

- `@use` 只会引入文件一次，且文件中的变量、函数、mixin 只能通过文件名来访问。





## js，es，ts

1. **JavaScript (JS)**

**定义**：JavaScript 是一种**脚本语言**，它被广泛用于浏览器中进行客户端编程，也可以在服务器端使用（比如 Node.js）。

- **用途**：JavaScript 用于实现网页的交互性，动态效果，AJAX 请求等。它是一种**解释型语言**，通常在浏览器中直接执行。
- **特点**：
  - 弱类型语言，变量的类型可以随时改变。
  - 动态类型，类型检查发生在运行时。
  - 支持面向对象编程、函数式编程等。

JavaScript 是**最常用的**前端编程语言，也有很多服务端应用（如 Node.js）。

2. **ECMAScript (ES)**

**定义**：ECMAScript 是由 **ECMA 国际**组织制定的**标准**，是所有现代JavaScript的核心规范。可以把 ECMAScript 看作 JavaScript 的“蓝图”或“规范”。

- **用途**：ECMAScript 为 JavaScript 提供了语言基础的语法规则，API 规范等。
- **版本**：
  - ECMAScript 每年发布一个新版本，标准会逐渐演进。常见的版本包括 ES3、ES5、ES6（也叫 ES2015）、ES2016、ES2017 等。
  - 其中 **ES6**（2015年发布）对 JavaScript 带来了很多重要特性，比如箭头函数、类、模板字符串、模块化等。

JavaScript 是对 ECMAScript 的实现，不同的浏览器和运行时环境（如 Node.js）可能会根据 ECMAScript 规范实现 JavaScript 引擎。

3. **TypeScript (TS)**

**定义**：TypeScript 是由 **微软**开发的**超集**，它是对 JavaScript 的扩展。TypeScript 增加了静态类型系统，允许开发者在代码中显式声明变量类型，提供类型检查，并支持现代 JavaScript 特性（比如 ES6+）。

- **用途**：TypeScript 主要用于开发大型应用程序，它通过增加类型系统帮助开发者更早发现错误，并提高代码的可维护性。
- **特点**：
  - **静态类型**：TypeScript 允许开发者声明变量类型，如字符串、数字、布尔值等。类型检查在编译时完成。
  - **向后兼容**：任何有效的 JavaScript 代码都是有效的 TypeScript 代码，TypeScript 会被编译成 JavaScript。
  - **支持 ES6+ 特性**：TypeScript 支持 JavaScript 中的 ES6（ES2015）及其以后版本的语法，甚至会提前支持一些未来版本的特性。

TypeScript 本质上是 JavaScript 的扩展，开发者写 TypeScript 代码后，需要通过编译（通常是通过 `tsc` 编译器）将其转换成 JavaScript 代码，然后运行。

------

**联系与区别总结**

| 特性             | JavaScript (JS)                         | ECMAScript (ES)                         | TypeScript (TS)                         |
| ---------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| **定义**         | 一种脚本语言，用于前端和后端开发。      | JavaScript 的规范，定义语言的核心。     | JavaScript 的超集，增加了静态类型支持。 |
| **类型系统**     | 动态类型（运行时检查）                  | 无类型系统定义                          | 静态类型（编译时检查）                  |
| **编译**         | 无需编译，直接执行                      | 无编译过程，只是语言规范                | 需要编译成 JavaScript 才能执行          |
| **支持的新特性** | 支持 ECMAScript 规范中定义的特性        | 定义语言的特性（如函数、数组、对象等）  | 支持所有 JavaScript 和 ECMAScript 特性  |
| **兼容性**       | 直接执行，可以在浏览器和 Node.js 中运行 | 是 JavaScript 的规范，JS 按照此规范实现 | 需要编译成 JavaScript，兼容 JS 代码     |

**总结**

- **JavaScript (JS)** 是实际的编程语言，它是由浏览器和运行时环境（如 Node.js）执行的。
- **ECMAScript (ES)** 是 JavaScript 的标准规范，决定了 JavaScript 的基本语法、功能和行为。
- **TypeScript (TS)** 是 JavaScript 的一个超集，它在 JavaScript 上增加了静态类型，编译时类型检查和其他一些功能，最终编译成普通的 JavaScript 代码执行。

如果你在做较为复杂或者团队合作的项目，使用 TypeScript 可以提高代码的可维护性和开发效率。对于小型项目或快速开发，JavaScript 可能更方便。而 ECMAScript 则是它们的标准基础。





## 基础数据类型

| 关键词  | 用法推荐               | 是否可以重复定义     | 是否可以修改值                         | 是否块级作用域       |
| ------- | ---------------------- | -------------------- | -------------------------------------- | -------------------- |
| `const` | **推荐优先使用**       | ❌ 不能               | ✅ 可以修改对象内部属性，但不能重新赋值 | ✅ 是                 |
| `let`   | 用在需要变化的变量上   | ❌ 不能               | ✅ 可以                                 | ✅ 是                 |
| `var`   | **尽量别用（老语法）** | ✅ 可以（但会出 bug） | ✅ 可以                                 | ❌ 否（是函数作用域） |

1. `const` （**常量**）✅ 推荐最多

- 一旦赋值 **不能再重新赋值**。
- 但是如果是对象或数组，可以修改里面的内容。

```js
const name = 'Tom';
// name = 'Jerry'; ❌ 报错

const user = { age: 18 };
user.age = 20; // ✅ OK
```

2. `let` （**变量**）✅ 推荐用在需要改变值的地方

- 只能声明一次。
- 可以修改值。
- 有 **块级作用域**（`{}` 里的变量只在花括号内生效）。

```js
let age = 25;
age = 26; // ✅

if (true) {
  let age = 30;
  console.log(age); // 30（只在这块作用域）
}
console.log(age); // 26
```

3. `var` （**旧语法，能不用就别用**）⚠️

- 会变量提升（hoisting），容易出 bug。
- 没有块级作用域，只有函数作用域。

```js
if (true) {
  var test = 123;
}
console.log(test); // 123（❗虽然 var 在 if 内定义，但外部依然能访问）
```

------

✅ 实际开发建议：

> **永远优先用 `const`，需要改变的再用 `let`，不要用 `var`。**





基本数据类型是**不可变的、按值存储**的，变量存储的是值本身，不是引用。

| 类型      | 示例值               | 说明                                   |
| --------- | -------------------- | -------------------------------------- |
| String    | `'hello'`, `"abc"`   | 字符串                                 |
| Number    | `123`, `3.14`, `NaN` | 所有数字，含整数和浮点数               |
| Boolean   | `true`, `false`      | 布尔值                                 |
| Undefined | `undefined`          | 声明未赋值的变量默认值                 |
| Null      | `null`               | 表示空值                               |
| Symbol    | `Symbol('id')`       | 表示独一无二的值（ES6）                |
| BigInt    | `123456789n`         | 表示大整数（超出 Number 范围，ES2020） |

1. **String**

- 表示文本。
- 可以用 `'`、`"` 或 ```（模板字符串）定义。
- 字符串是不可变的。

```js
let str = "Hello";
let name = `Alice`;
let greeting = `Hi, ${name}`;//可以插入变量
```

------

2. **Number**

- 包括整数、浮点数、`Infinity`、`-Infinity` 和 `NaN`（非数字）。

```js
let a = 42;
let b = 3.14;
let c = NaN;         // 运算失败时返回
let d = Infinity;
```

------

3. **Boolean**

- 用于逻辑判断，只有两个值：`true` 和 `false`。

```js
let isOnline = true;
let isAdult = false;
```

------

4. **Undefined**

- 变量声明了但**没有赋值**时，默认值是 `undefined`。

```js
let x;
console.log(x); // undefined
```

------

5. **Null**

- 人为设置为空值，表示“无值”或“空对象”。

```js
let user = null;
```

> ⚠️ 注意：`typeof null === 'object'` 是一个历史 bug。

------

6. **Symbol**（ES6）

- 每个 `Symbol` 都是唯一的，通常用于对象属性名，防止属性冲突。

```js
let id = Symbol('userId');
let obj = {
  [id]: 123
};
```

------

7. **BigInt**（ES2020）

- 用于表示超过 `Number.MAX_SAFE_INTEGER` 的整数。
- 末尾加 `n` 表示 BigInt 类型。

```js
let big = 123456789012345678901234567890n;
```



简单对比

| 运算符 | 名称                     | 是否比较类型 | 是否比较值 | 会不会类型转换       |
| ------ | ------------------------ | ------------ | ---------- | -------------------- |
| `==`   | **宽松相等**（抽象相等） | ❌ 否         | ✅ 是       | ✅ **会自动类型转换** |
| `===`  | **严格相等**（恒等）     | ✅ 是         | ✅ 是       | ❌ 不会类型转换       |

------

✅ 示例对比

```js
1 == '1'       // true   ✅ 值相等，类型不同但被转换
1 === '1'      // false  ❌ 类型不同，严格不相等

0 == false     // true   ✅ 会转换类型
0 === false    // false  ❌ 类型不同

null == undefined   // true   ✅ 特殊情况，视为相等
null === undefined  // false  ❌ 类型不同

NaN == NaN      // false  ❌ NaN 不等于任何东西，包括自己
NaN === NaN     // false  ❌ 同上，用 Number.isNaN() 判断
```

------





## 对象，函数，作用域

```js
// 创建，属性读取修改删除
// 1.对象类型时引用类型
// 2.创建对象
var obj = {
    name:'zzz',
    age:'18'
 } //简单对象
 //增加属性
 obj.sex='n'
 //读取属性
console.log(obj.name)
console.log(obj['age'])
//设置属性
obj.name='hhh'
//删除属性
delete obj.name

var str = 'ds'
obj[str] = 'sadf'  
console.log(obj)

// symbol对象
var key = Symbol('key')
obj[key] = 'this is symbol'
//取值
console.log(obj[key])

//私有属性，设定一个symbol对象，但不给key变量，这个属性谁也无法获取
//面向对象编程，封装（数据、方法）
```





```js
//函数
function add(a, b, c){
    var d = a + b + c
    return d
}

var re = add(1,2,3)
console.log(re)

//函数重载，同一个函数名的函数，会因为函数的参数和类型的不同而执行不同的逻辑，js中无，叫函数的覆盖
```



```js
//作用域，es2015前只有全局作用域和函数作用域
//es2015后增加了一个块级作用域
// 1.全局作用域
a = 1
//var 声明全局变量
// 2. 函数作用域
function fn() {
    var b = 2
}

// 3.块级作用域，用const和let声明
{
    let c = 1
    const e = 3
    {
        let d = 2
    }
    // console.log(d)
    console.log(c)
    console.log(e)
}
```





```js
//所有定义的变量binding，按照词法作用域进行（程序还未执行）
//动态作用域，变量的binding，在执行阶段才进行
//js没有动态作用域，只有静态作用域

let x =10

function test(){
    console.log(x)
}

function main(){
    let x =20
    test()
}

main()
```





## 变量提升

**变量提升（Hoisting）** 是 JavaScript 中一个非常重要但容易让人混淆的特性。它描述了 JavaScript 中的变量和函数声明会在代码执行之前被**提升**到作用域的顶部。

------

🔹 **什么是变量提升（Hoisting）？**

变量提升是指 JavaScript 在执行代码之前，会将所有的**变量声明**（`var`、`let`、`const`）和**函数声明**提升到当前作用域的顶部。但只会提升**声明部分**，**赋值部分**不会被提升。

🧠 关键点：

1. **声明被提升**，但**赋值不会提升**。
2. **`var`、`let`、`const` 的提升方式不同**。
3. **函数声明（Function Declaration）**会被完全提升。

------

🔹 **`var` 的变量提升**

在使用 `var` 声明变量时，变量会被提升到作用域的顶部，但赋值不会提升。也就是说，`var` 声明的变量会先初始化为 `undefined`，直到实际赋值。

示例 1：`var` 的变量提升

```js
console.log(a);  // undefined
var a = 10;
console.log(a);  // 10
```

解析：

- **提升过程**：JavaScript 会将 `var a;` 提升到顶部，而 `a = 10;` 留在原地。
- 结果就是第一次 `console.log(a)` 输出 `undefined`，因为 `a` 已经被声明，但还没有赋值。

示例 2：`var` 的函数提升

```js
foo();  // "Hello"

function foo() {
  console.log("Hello");
}
```

解析：

- **函数声明**（`function foo()`）会完全提升，包括其函数体。因此，`foo()` 可以在声明之前调用。

------

🔹 **`let` 和 `const` 的变量提升**

`let` 和 `const` 的提升与 `var` 不同。它们也会被提升到作用域顶部，但会进入一个“暂时性死区”（TDZ，Temporal Dead Zone）。在此区域内访问这些变量会抛出错误。

示例 1：`let` 和 `const` 的暂时性死区

```js
console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

解析：

- `a` 被提升到顶部，但在赋值之前，访问它会抛出 `ReferenceError` 错误。这是因为 `let` 和 `const` 变量会进入**暂时性死区**，直到它们被初始化。

示例 2：`let` 和 `const` 的不同

```js
console.log(b);  // ReferenceError: Cannot access 'b' before initialization
const b = 20;
```

解析：

- 和 `let` 类似，`const` 也会被提升，但是不能在初始化之前访问。

------

🔹 **函数表达式和声明的区别**

1. **函数声明（Function Declaration）**

```js
console.log(foo());  // "Hello"

function foo() {
  return "Hello";
}
```

**函数声明会被完全提升**，包括其实现。

2. **函数表达式（Function Expression）**

```js
console.log(foo());  // TypeError: foo is not a function

var foo = function() {
  return "Hello";
};
```

**函数表达式**（即将函数赋给一个变量）不会被完全提升。**只会提升变量声明**，而不会提升函数体的赋值，因此在调用时会报错。

------

🔹 **总结**

| 特性                     | `var`                      | `let` / `const`            | 函数声明（`function`） |
| ------------------------ | -------------------------- | -------------------------- | ---------------------- |
| **提升位置**             | 变量声明提升到顶部         | 变量声明提升到顶部         | 整个函数声明提升到顶部 |
| **变量值的初始化**       | 提升时初始化为 `undefined` | 进入暂时性死区，直到初始化 | 函数体和函数名完全提升 |
| **赋值是否提升**         | 否                         | 否                         | 否                     |
| **是否可以在声明前使用** | 可以（值是 `undefined`）   | 不可以（死区错误）         | 可以                   |

------

🔹 **实际开发中的注意事项**

- 尽量避免在变量声明之前使用它们，尤其是 `var`，因为它会造成不可预期的行为。
- **推荐使用 `let` 和 `const`**，因为它们更符合现代 JavaScript 的编码规范，并且能避免由变量提升引起的错误。
- 函数声明可以放心放置在代码的任何位置，而函数表达式要谨慎，确保赋值在调用之前完成。





## const定义

1. `const` 对基础数据类型

基础数据类型（string、number、boolean、null、undefined、symbol、bigint）时，
 **const 保证的是变量的值不可变**。

示例：

```js
const a = 10;
a = 20; // ❌ 报错：Assignment to constant variable.
```

- `const` 声明的变量必须**立刻赋值**。
- **以后不能改变这个值**。
- 直接赋新值会报错。

------

2. `const` 对引用数据类型

引用数据类型（对象、数组、函数）时，
 **const 保证的是变量的地址（引用）不能变**，
 但是**对象内部的属性、数组的元素**是可以改动的！

示例 1：对象

```js
const obj = { name: 'Tom' };

obj.name = 'Jerry';  // ✅ 可以修改属性
console.log(obj.name); // Jerry

obj = {}; // ❌ 报错：Assignment to constant variable.
```

- `obj` 的引用地址不能改，不能把 `obj` 指向别的对象了。
- 但 `obj` 指向的这个对象的**内容可以变**。

------

示例 2：数组

```js
const arr = [1, 2, 3];

arr.push(4);  // ✅ 可以添加元素
console.log(arr); // [1,2,3,4]

arr = [5, 6]; // ❌ 报错：Assignment to constant variable.
```

- 同理，数组的地址不能变，数组内部的元素可以变。



## 箭头函数

### 语法

**箭头函数（Arrow Function）** 是 JavaScript ES6 引入的一种更简洁的函数写法，非常常见。

------

🟢 一、箭头函数是什么？

箭头函数是函数的“**简写形式**”。

✅ 传统函数写法：

```js
function add(a, b) {
  return a + b;
}
```

✅ 箭头函数写法：

```js
const add = (a, b) => {
  return a + b;
};
```

> 是不是更简洁？变量 `add` 变成一个函数变量，使用 `=>`（箭头）表示“这是个函数”。

------

🧠 二、箭头函数的基本语法规则

```js
(param1, param2, ...) => {
  // 函数体
}
```

| 语法情况                          | 示例                             |
| --------------------------------- | -------------------------------- |
| 一个参数可省括号                  | `name => console.log(name)`      |
| 多个参数需要括号                  | `(a, b) => a + b`                |
| 只有一行返回，可省大括号和 return | `(a, b) => a + b`（自动 return） |
| 没有参数要写空括号                | `() => console.log('hello')`     |

------

✅ 三、常见使用场景（配合高阶函数）

1. 数组遍历（配合 `forEach`, `map`, `filter`）

```js
const nums = [1, 2, 3];

// 普通函数
nums.forEach(function(num) {
  console.log(num);
});

// 箭头函数
nums.forEach(num => console.log(num));
```

------

2. 数组变形（用 `map`）

```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

------

3. 条件筛选（用 `filter`）

```js
const nums = [1, 2, 3, 4, 5];
const even = nums.filter(n => n % 2 === 0);
console.log(even); // [2, 4]
```

------

4. 排序（用 `sort`）

```js
const nums = [5, 3, 8, 1];
nums.sort((a, b) => a - b); // 升序
console.log(nums); // [1, 3, 5, 8]
```

------

⚠️ 四、箭头函数和普通函数的区别（关键点）

| 区别点           | 箭头函数                    | 普通函数                           |
| ---------------- | --------------------------- | ---------------------------------- |
| 写法简洁         | ✅                           | ❌                                  |
| 自动绑定 this    | ✅（不改变外层的 this）      | ❌（函数内 this 会变）              |
| 能不能当构造函数 | ❌ 不能（不能用 `new` 调用） | ✅ 可以                             |
| 适合场景         | 回调函数、短逻辑、数组方法  | 构造器、复杂逻辑、需要 this 的地方 |

❗ 重点区别举例：

```js
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++;
    console.log(this.age); // 箭头函数 this = 外面的 this（Person 实例）
  }, 1000);
}
new Person();
```

如果你用 `function() {}` 来写 `setInterval` 的函数，`this` 会指向 `window` 而不是 `Person`，这是初学者常掉的坑。

------

🧾 总结

- `()=>{}` 是函数的简写
- 常用于数组处理、回调函数
- 不要用来当构造函数（不能 `new`）
- 箭头函数没有自己的 `this`，更适合处理逻辑时保持 `this` 不变

------



### 返回值规则

箭头函数有**两种语法形式**

------

✨ ✅ 1. **简写形式**（省略 `{}` 时）

如果箭头函数的函数体是**一行表达式**，你可以**省略大括号 `{}` 和 `return`**，JS 会自动帮你返回这个表达式的值。

```js
x => x * 2
```

等同于 👇👇

```js
x => {
  return x * 2;
}
```

这叫做**隐式返回（implicit return）**。

------

🧱 ✅ 2. **块体形式**（使用 `{}` 时）

如果你用了大括号 `{}`，**JavaScript 会认为你写的是函数体**，你就必须**手动写上 `return`**：

```js
(item) => {
  return item * 2; // ✅ 有 return 才会返回值
}
```

如果你写成这样👇但没有 return，就会返回 `undefined`：

```js
(item) => {
  item * 2; // ❌ 没有 return，什么都不会返回
}
```

------

🔍 举个对比例子：

```js
let arr = [1, 2, 3];

// ✅ 隐式返回（没有大括号）
let a = arr.map(x => x * 2); // [2, 4, 6]

// ✅ 显式返回（有大括号和 return）
let b = arr.map((x) => {
  return x * 2;
});

// ❌ 错误写法（有大括号但没 return）
let c = arr.map((x) => {
  x * 2;
});
console.log(c); // [undefined, undefined, undefined]
```

------

✅ 总结规则

| 写法                      | 要不要写 `return` | 返回结果           |
| ------------------------- | ----------------- | ------------------ |
| `(x) => x * 2`            | ❌ 不用写          | 自动返回结果       |
| `(x) => { x * 2 }`        | ✅ 必须写          | 否则返回 undefined |
| `(x) => { return x * 2 }` | ✅ 推荐写清楚      | 返回结果           |



## this

掌握**“谁调用了函数”**，才能真正理解 `this` 的指向。我们马上来讲清楚：

------

✅ 一、判断函数是被“谁”调用

**记住一句核心规律：**

> JavaScript 中，`this` 取决于**函数是“怎么被调用的”**，不是**在哪里定义的**。

------

📌 1. 函数被“对象调用” → `this` 指向该对象 ✅

```js
const person = {
  name: '张三',
  sayHi: function () {
    console.log(this.name);
  }
};

person.sayHi(); // ✅ this 指向 person → 输出：张三
```

- **是谁点的 `sayHi`？** 是 `person`
- 所以 `this` 就是 `person`

------

📌 2. 函数被“独立调用”或“浏览器系统调用” → `this` 指向全局对象 ❌

```js
function hello() {
  console.log(this);
}

hello(); // ❌ this = window（浏览器） or undefined（严格模式下）
```

- `hello()` 没被对象点出来，**this 是全局的 `window` 或 `global`**

------

💣 在定时器中的函数：

```js
setTimeout(function () {
  console.log(this);
}, 1000);
```

- `setTimeout` 是浏览器内置 API，它**不是某个对象的方法**
- 所以里面的 `function () {}` 是被**浏览器调用的**
- 👉 所以 `this === window`（浏览器中）

在 Node.js 中：

- `setTimeout` 内部函数中的 `this` 是 `Timeout` 对象或 `undefined`（取决于环境）

------

✅ 3. 箭头函数不会创建自己的 `this` → 它继承“定义时”的上下文

```js
const obj = {
  name: '小明',
  say: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

obj.say(); // 输出：小明
```

- `say()` 是由 `obj` 调用的，`this = obj`
- 箭头函数继承了外面的 `this`
- 所以箭头函数里也是 `obj`



构造函数的this为新创建的实例对象

```js
function persion() {
    this.name = 'persion';
    this.age = 18;
    this.getName = function() {
        console.log(this.name);
    };
}
const p1 = new persion();
console.log(p1);   //persion { name: 'persion', age: 18 }
p1.getName();  // 输出: persion 
```



------

🔍 总结判断流程：

| 情况                             | `this` 指向                 |
| -------------------------------- | --------------------------- |
| 被对象调用（如 `obj.fn()`）      | `this = obj`                |
| 直接调用（如 `fn()`）            | `this = window/global`      |
| 构造函数调用（如 `new Fn()`）    | `this = 新创建的对象`       |
| 箭头函数（如 `() => {}`）        | 没有自己的 `this`，继承外层 |
| 浏览器调用（如 `setTimeout(fn)`) | `this = window`（非箭头）   |

🙋‍♂️ 小贴士：

👉 如果你看到一个函数是直接调用的：

```js
fn();
```

`this` 是全局的（window 或 undefined）

👉 如果你看到对象点出来的函数：

```js
obj.fn();
this` 是 `obj
```

👉 如果你看到箭头函数：

```js
() => { console.log(this); }
```

它不管谁调用，**永远继承定义时的 `this`**



## 展开运算符...

```js
let uniqueArr = [...new Set(arr)];
```

那前面的三个点 `...` 是 JavaScript 中的一个**非常重要的语法**，叫：

> ✅ **展开运算符（Spread Operator）**

------

🧠 一、什么是 `...`（展开运算符）

它的作用是：

> **把一个“可迭代对象”（如数组、字符串、Set 等）拆开，一项项“展开”出来**

举个简单例子：

```js
let arr = [1, 2, 3];
console.log(...arr); // 输出：1 2 3（不是数组，是三个独立值）

let copy = [...arr]; // 复制数组
console.log(copy); // [1, 2, 3]
```

------

📦 二、结合 `new Set()` 的含义

你这段代码的核心是：

```js
[...new Set(arr)];
```

逐步拆解来看：

1️⃣ `new Set(arr)`

创建了一个 **Set**（集合），**自动去重**：

```js
new Set([1, 2, 2, 3, 4, 4]); // Set { 1, 2, 3, 4 }
```

> Set 是 JS 中的一种特殊数据结构，**只允许唯一值**。

2️⃣ `...new Set(arr)`

把 Set 展开成一个一个的值：

```js
...Set { 1, 2, 3, 4 } // 变成 → 1, 2, 3, 4
```

3️⃣ `[...new Set(arr)]`

用 `[]` 把这些展开的值重新放入一个新的数组中：

```js
[1, 2, 3, 4] // 新数组，完成去重
```

------

✅ 总结这段代码：

```js
let arr = [1, 2, 2, 3, 4, 4];
let uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4]
```

| 部分              | 含义                     |
| ----------------- | ------------------------ |
| `Set(arr)`        | 把数组转换成去重后的 Set |
| `...new Set(arr)` | 把 Set 里面的值展开出来  |
| `[...]`           | 把展开的值重新包进数组   |

最终效果：**对数组去重**

------

💡 Bonus：还有哪些地方用 `...`？

✅ 数组合并

```js
let a = [1, 2];
let b = [3, 4];
let c = [...a, ...b]; // [1, 2, 3, 4]
```

✅ 函数参数展开

```js
function sum(a, b, c) {
  return a + b + c;
}
let nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

✅ 字符串展开成字符数组

```js
let str = "hi";
console.log([...str]); // ['h', 'i']
```

------









## 数据结构

### 数组

🔹 **1. 数组定义与基本使用**

数组的定义

数组在 JavaScript 中是一个有序的**集合**，用来存储多个元素。数组的元素可以是任意类型的数据：数字、字符串、对象、甚至是另一个数组。

```js
// 数组的定义方式有两种：
let arr1 = [1, 2, 3, 4, 5]; // 字面量定义方式
let arr2 = new Array(1, 2, 3, 4, 5); // 构造函数定义方式
```

数组的索引

- **数组的索引是从 0 开始的**，访问数组元素时使用**索引**。

```js
let arr = ['apple', 'banana', 'cherry'];
console.log(arr[0]); // 'apple'
console.log(arr[1]); // 'banana'
console.log(arr[2]); // 'cherry'
```

- 如果索引超出了数组的长度，会返回 `undefined`。

```js
console.log(arr[5]); // undefined
```

数组的长度

- 数组的长度是通过 `arr.length` 获取的，表示数组中元素的个数。

```js
let arr = [1, 2, 3];
console.log(arr.length); // 3
```

- **注意：** `length` 是动态的，修改数组的元素会自动调整 `length`，但如果直接修改 `length`，则数组的内容可能会丢失。

```js
arr.length = 2; // 数组变成 [1, 2]
console.log(arr); // [1, 2]
```

------

🔹 **2. 数组的常用方法**

2.1 **添加元素**

`push()`

- 向数组末尾添加一个或多个元素，返回新数组的长度。

```js
let arr = [1, 2, 3];
arr.push(4, 5);
console.log(arr); // [1, 2, 3, 4, 5]
```

`unshift()`

- 向数组的开头添加一个或多个元素，返回新数组的长度。

```js
let arr = [1, 2, 3];
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]
```

2.2 **删除元素**

`pop()`

- 从数组末尾删除一个元素，返回被删除的元素。

```js
let arr = [1, 2, 3];
let last = arr.pop();
console.log(last); // 3
console.log(arr);  // [1, 2]
```

`shift()`

- 从数组的开头删除一个元素，返回被删除的元素。

```js
let arr = [1, 2, 3];
let first = arr.shift();
console.log(first); // 1
console.log(arr);   // [2, 3]
```

3. **查找元素**

`indexOf()`

- 返回指定元素在数组中的第一个索引，找不到返回 `-1`。

```js
let arr = [1, 2, 3, 2, 4];
console.log(arr.indexOf(2)); // 1
console.log(arr.indexOf(5)); // -1
```

`includes()`

- 判断数组中是否包含某个元素，返回布尔值。

```js
let arr = [1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(4)); // false
```

4. **遍历数组**

`forEach()`

- 遍历数组，对每个元素执行指定的回调函数。

```js
let arr = [1, 2, 3];
arr.forEach(item => console.log(item));
// 输出：
// 1
// 2
// 3
```

`map()`

- 创建一个新数组，数组的每个元素是调用函数处理后的结果。

```js
let arr = [1, 2, 3];
let newArr = arr.map(x => x * 2);
console.log(newArr); // [2, 4, 6]
```

5. **修改数组**

`splice()`

- 从指定位置删除或替换数组中的元素，并可以插入新元素。

```js
let arr = [1, 2, 3, 4, 5];
// 删除 2 个元素，从索引 1 开始
arr.splice(1, 2);  
console.log(arr); // [1, 4, 5]
```

- **删除并替换元素：**

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2, 'a', 'b');  
console.log(arr); // [1, 'a', 'b', 4, 5]
```

`slice()`

- 创建一个新数组，包含从原数组中提取的一部分元素，**不会改变原数组**。

```js
let arr = [1, 2, 3, 4, 5];
let newArr = arr.slice(1, 4); // 提取索引 1 到 3 的元素
console.log(newArr); // [2, 3, 4]
```

------

🔹 **3. 数组的其他常见操作**

1. **数组转字符串**

`join()`

- 将数组的所有元素连接成一个字符串，默认用逗号分隔。

```js
let arr = ['a', 'b', 'c'];
console.log(arr.join()); // "a,b,c"
console.log(arr.join('-')); // "a-b-c"
```

2. **数组去重**

`Set`

- 使用 `Set` 去重，因为 `Set` 只存储唯一值。

```js
let arr = [1, 2, 2, 3, 4, 4];
let uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4]
```



### set

`Set` 是 JavaScript 中的一个内置对象，它表示一个**值的集合**，每个值在 `Set` 中是唯一的。换句话说，`Set` 会自动移除重复的元素。

特性：

- **值唯一**：`Set` 中的每个元素是唯一的，没有重复的值。
- **顺序**：`Set` 中的元素是按照插入顺序存储的。
- **可以存储任何类型的值**：包括原始值（数字、字符串、布尔值等）和对象（如数组、对象等）。

创建 `Set`

使用 `new Set()` 来创建一个新的 `Set` 对象。

```js
let set1 = new Set();
console.log(set1); // Set {}
```

向 `Set` 中添加元素

可以使用 `add()` 方法向 `Set` 中添加元素。如果你添加重复的元素，它会被自动忽略。

```js
let set2 = new Set();
set2.add(1);      // 添加数字 1
set2.add('hello'); // 添加字符串 'hello'
set2.add(1);      // 尝试添加重复的数字 1，不会生效

console.log(set2); // Set { 1, 'hello' }
```

------

🔹 **`Set` 的常用操作**

1. **添加元素：`add()`**

使用 `add()` 方法向 `Set` 中添加单个元素。如果元素已经存在，`Set` 不会重复添加。

```js
let set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(2); // 不会重复添加
console.log(set); // Set { 1, 2, 3 }
```

2. **删除元素：`delete()`**

使用 `delete()` 方法从 `Set` 中删除指定的元素，返回 `true` 或 `false`，表示删除是否成功。

```js
let set = new Set([1, 2, 3]);
set.delete(2); // 删除元素 2
console.log(set); // Set { 1, 3 }
```

3. **检查元素是否存在：`has()`**

使用 `has()` 方法检查 `Set` 中是否存在某个元素，返回 `true` 或 `false`。

```js
let set = new Set([1, 2, 3]);
console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

4. **清空 `Set`：`clear()`**

使用 `clear()` 方法清空 `Set` 中的所有元素。

```js
let set = new Set([1, 2, 3]);
set.clear();
console.log(set); // Set {}
```

5. **获取 `Set` 的大小：`size`**

使用 `size` 属性来获取 `Set` 中元素的数量。

```js
let set = new Set([1, 2, 3, 3, 4]);
console.log(set.size); // 4 （重复的 3 会被自动去除）
```

6. **遍历 `Set`**

`Set` 是按插入顺序进行遍历的，可以使用 `forEach()` 方法或者 `for...of` 循环来遍历元素。

`forEach()` 方法

```js
let set = new Set([1, 2, 3]);
set.forEach(value => {
  console.log(value);  // 1, 2, 3
});
```

`for...of` 循环

```js
let set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value);  // 1, 2, 3
}
```

------

🔹 **`Set` 的特点与优势**

1. **唯一性**

`Set` 保证了集合中的每个元素是唯一的，自动去除重复项。它非常适用于处理需要去重的场景。

```js
let arr = [1, 2, 2, 3, 3, 4, 5];
let uniqueSet = new Set(arr);
console.log(uniqueSet); // Set { 1, 2, 3, 4, 5 }


const arr = [1,2,2,2,2,2,3]
const set1 = new Set(arr)
const arr2 = Array.from(set1)
```

2. **顺序性**

`Set` 中的元素是按照插入顺序排列的，你可以按顺序遍历它。

```js
let set = new Set();
set.add(1);
set.add(2);
set.add(3);

for (let value of set) {
  console.log(value); // 输出 1, 2, 3
}
```

3. **性能优势**

- **查找**：`Set` 提供了比数组更高效的查找操作，特别是在去重和判断元素是否存在时，`Set` 的时间复杂度是 O(1)，而数组的时间复杂度是 O(n)。
- **去重**：如果你需要从一个数组中去重，`Set` 通过 `new Set(arr)` 可以快速去除重复项，性能更好。

------

🔹 **`Set` 的应用场景**

1. **去重**

最常见的应用就是去重。如果你有一个包含重复元素的数组，可以用 `Set` 来快速去重：

```js
let arr = [1, 2, 3, 4, 5, 1, 2];
let uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```

2. **集合运算**

`Set` 支持集合运算，例如并集、交集、差集等操作。虽然 `Set` 本身没有直接提供这些方法，但可以通过编写自定义函数实现。

并集：两个 `Set` 的并集

```js
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);
let union = new Set([...setA, ...setB]);
console.log(union); // Set { 1, 2, 3, 4, 5 }
```

交集：两个 `Set` 的交集

```js
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);
let intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set { 3 }
```

差集：从 `setA` 中删除 `setB` 中的元素

```js
let setA = new Set([1, 2, 3, 4]);
let setB = new Set([3, 4, 5, 6]);
let difference = new Set([...setA].filter(x => !setB.has(x)));
console.log(difference); // Set { 1, 2 }
```





### map

`Map` 是 JavaScript 中的一种**键值对集合**，它在很多场景下与传统的对象（`Object`）类似，但 `Map` 有一些更加灵活和高效的特性，尤其在处理哈希表时非常有用。

------

🔹 **什么是 `Map`？**

`Map` 是 JavaScript 中的一个内置对象，用于**存储键值对**。它可以将**任何类型的值作为键**，并允许按插入顺序迭代它的键值对。`Map` 也提供了比普通对象更多的操作方法和性能优化。

特性：

- **键值对存储**：`Map` 是一个“键值对”的集合，类似于对象。
- **任意类型的键**：`Map` 的键可以是任何数据类型（比如对象、函数、基本类型等），而普通对象的键只能是字符串或者转换为字符串的值。
- **顺序性**：`Map` 是按插入顺序存储键值对的，插入顺序可以通过迭代来访问。
- **性能**：`Map` 在大量数据处理时比普通对象更加高效。

------

🔹 **如何创建 `Map`？**

创建 `Map`

通过 `new Map()` 可以创建一个新的 `Map` 实例。

```js
let map = new Map();
console.log(map); // Map {}
```

使用二维数组初始化 `Map`

可以传入一个二维数组来初始化 `Map`，其中数组的每个子数组包含一个键值对。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 25],
  ['job', 'developer']
]);

console.log(map); // Map { 'name' => 'Tom', 'age' => 25, 'job' => 'developer' }
```

------

🔹 **`Map` 的常用操作**

1. **添加键值对：`set()`**

`set()` 方法用于向 `Map` 中添加或更新一个键值对。如果键已存在，则更新该键的值。

```js
let map = new Map();
map.set('name', 'Tom');
map.set('age', 25);
map.set('age', 30); // 更新 age 的值为 30

console.log(map); // Map(3) { 'name' => 'Tom', 'age' => 30 }
```

2. **获取值：`get()`**

`get()` 方法用于根据键获取对应的值。如果键不存在，返回 `undefined`。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

console.log(map.get('name')); // 'Tom'
console.log(map.get('age'));  // 30
console.log(map.get('job'));  // undefined
```

3. **检查键是否存在：`has()`**

`has()` 方法用于检查 `Map` 中是否包含指定的键，返回布尔值。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

console.log(map.has('name')); // true
console.log(map.has('job'));  // false
```

4. **删除键值对：`delete()`**

`delete()` 方法用于删除 `Map` 中的指定键值对，返回一个布尔值，表示删除是否成功。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

map.delete('age'); // 删除 'age'
console.log(map); // Map { 'name' => 'Tom' }
```

5. **清空 `Map`：`clear()`**

`clear()` 方法用于删除 `Map` 中的所有键值对。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

map.clear();
console.log(map); // Map {}
```

6. **获取 `Map` 的大小：`size`**

`size` 属性返回 `Map` 中键值对的个数。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

console.log(map.size); // 2
```

7. **遍历 `Map`**

`forEach()` 方法

`forEach()` 方法用于遍历 `Map` 中的每个键值对，依次调用提供的回调函数。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

map.forEach((value, key) => {
  console.log(key, value);
});
// 输出：
// name Tom
// age 30
```

`for...of` 循环

`for...of` 循环可以用于遍历 `Map`，可以通过解构获取每个键值对。

```js
let map = new Map([
  ['name', 'Tom'],
  ['age', 30]
]);

for (let [key, value] of map) {
  console.log(key, value);
}
// 输出：
// name Tom
// age 30
```

------

🔹 **`Map` 与对象的区别**

尽管 `Map` 和对象都可以用来存储键值对，但它们有很多不同之处。

| 特性             | `Map`                                                        | `Object`                                                |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| **键的类型**     | 可以是任何类型（包括对象、函数等）                           | 只能是字符串或能转换成字符串的值                        |
| **键值对的顺序** | 按照插入顺序存储                                             | 键的顺序不固定（虽然 ES6 开始是有顺序的，但不建议依赖） |
| **性能**         | 在大量数据操作时更高效（查找、删除等）                       | 对象性能较差，特别是键很多时                            |
| **默认值**       | `Map` 是空的，键值对都需要显式添加                           | 对象有默认的原型链属性                                  |
| **方法**         | 提供了丰富的操作方法（`set()`, `get()`, `delete()`, `has()` 等） | 只能通过点操作符或者方括号访问、添加键值                |

------

🔹 **`Map` 的应用场景**

1. **频率计数**：`Map` 可以非常方便地用来记录元素出现的频率。

   例如，统计一个数组中每个元素出现的次数：

   ```js
   let arr = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'];
   let frequency = new Map();
   
   for (let item of arr) {
     frequency.set(item, (frequency.get(item) || 0) + 1);
   }
   
   console.log(frequency); 
   // Map { 'apple' => 2, 'banana' => 3, 'orange' => 1 }
   ```

2. **存储复杂键**：`Map` 可以使用对象作为键，这在需要使用对象键的场景下非常有用。

   ```js
   let map = new Map();
   let objKey = { id: 1 };
   
   map.set(objKey, 'Some value');
   console.log(map.get(objKey)); // 'Some value'
   ```

3. **更灵活的数据结构**：`Map` 允许更复杂的操作，比如按插入顺序进行迭代，或者将键值对的键和值使用任意类型，这使得 `Map` 在很多情况下比对象更加灵活和高效。！





## 判断语句

```js
// 不等于!==
// 与&& 或 ||
const myname = "lx";
if (myname === 'lxy') {
    console.log("yes");
}
else if(myname ==='hhh') {
    console.log("no")
}
else {
    console.log("shayebushi")
}


switch(myname) {
    case 'lxy':{   console.log("yes");break;}
    case 'hhh': { console.log("no");break;}
    default: {  console.log("shayebushi")}
}
```



## 循环语句

```js
const arr = [1,2,3,4,5]
for (let i = 0; i < arr.length ; i++){
    console.log(arr[i])
}

while(true) {

}


do {

} while(true)

```





## 消息队列和事件循环

 JavaScript 是单线程执行的，且采用了 **事件循环 (Event Loop)** 和 **消息队列 (Message Queue)** 机制来处理异步任务。

1. **JavaScript的执行模型**：单线程和事件循环

JavaScript 在浏览器中的执行是单线程的，也就是说，它一次只能执行一个任务。然而，现代的 JavaScript 需要处理很多需要等待的任务，比如网络请求、定时器、用户输入等。为了避免阻塞其他任务的执行，JavaScript 引入了 **事件循环** 和 **消息队列** 机制。

2. **同步与异步任务**

- **同步任务**：同步代码是按照顺序一个接一个执行的，也就是当前任务完成后才会执行下一个任务。
- **异步任务**：异步任务不会阻塞主线程，它们会将任务放入消息队列中，等到主线程空闲时才执行。

3. **setTimeout的工作机制**

`setTimeout` 是一个典型的异步任务，它并不会立刻执行，而是将回调函数放入消息队列中，在指定的延迟时间之后，才由事件循环将它从消息队列取出并执行。

4. **执行过程**

假设你有以下代码：

```javascript
console.log("开始");

setTimeout(function() {
    console.log("异步操作完成");
}, 2000);

console.log("结束");
```

执行顺序是这样的：

1. **主线程开始执行**，首先输出 `"开始"`。
2. **遇到 setTimeout**：`setTimeout` 被调用时，它的回调函数并不会立即执行。相反，它会将回调函数放入 **消息队列**，并且计时器开始倒计时（此时主线程继续执行后续代码）。
3. **继续执行同步任务**：由于 `setTimeout` 是异步操作，主线程接着继续执行后续代码，输出 `"结束"`。
4. **延迟 2 秒后**：计时器完成（2 秒），`setTimeout` 将回调函数放入消息队列中。此时，主线程已经完成了所有同步代码的执行，事件循环开始查看消息队列。
5. **事件循环**：事件循环发现消息队列中有待执行的异步回调函数，就将它取出来并执行。
6. 最后，回调函数输出 `"异步操作完成"`。



**更多关于事件循环和消息队列的知识**：

- JavaScript 通过事件循环机制不断地检查是否有需要处理的异步任务。
- **消息队列**存储了等待执行的回调函数，事件循环会检查队列，并依次执行其中的任务。
- **微任务队列**（如 `Promise`）的优先级高于普通的 **宏任务队列**（如 `setTimeout`），因此，微任务会在当前宏任务执行完之后立即执行。



问题描述

- 如果你在执行 `setTimeout` 时，设定了 2 秒的延迟，但同步代码还没有执行完，那么计时器是从何时开始的？
- 如果同步代码执行时间超过了 2 秒，**计时器的回调函数**会怎样执行呢？

**计时器的执行时机**

`setTimeout` 中的 **延迟时间**（比如 2 秒）并不是指从调用 `setTimeout` 开始执行代码后的精确 2 秒，而是指从 **回调函数加入消息队列之前的时间**。但是，重要的是 **异步代码的回调函数不能立刻执行**，它必须等到所有同步代码执行完成之后，才能从消息队列中取出并执行。

详细解释：

1. **`setTimeout` 设置计时器**：当 `setTimeout` 被调用时，它会设置一个计时器，并开始倒计时。假设你设置了 `setTimeout(callback, 2000)`，计时器就会在 2000 毫秒（2 秒）后触发。然而，这个计时器的回调函数不会立刻执行，而是等到 2 秒后将该回调放入 **消息队列** 中。
2. **同步代码先执行**：JavaScript 的执行机制是单线程的，这意味着在同步代码没有执行完之前，异步任务的回调（即 `setTimeout` 的回调）是不会被执行的。因此，即使计时器已经满 2 秒，**只要同步代码还没执行完，回调函数依旧不会被触发**。
3. **如果同步代码没有在 2 秒内执行完**：即使计时器已经到达了 2 秒，**回调函数不会立刻执行**，而是会等到当前的同步代码执行完毕之后。**换句话说，回调函数的执行会被延迟到同步任务执行完后**。
4. **回调函数的执行时机**：当同步代码执行完毕，事件循环会查看消息队列，发现 `setTimeout` 的回调函数已准备好执行，然后把它从消息队列中取出并执行。



## 函数

### 匿名函数

为什么会有匿名函数（Anonymous Function）？

**匿名函数**就是**没有名字的函数**，它存在的意义是为了让**代码更灵活、更简洁**，尤其适合**临时使用、一次性使用**的场景。

------

主要原因

1. **临时使用**
    有些函数只需要用一次，比如：

   - 作为回调函数传递给其他函数
   - 用来处理一小段逻辑，不值得特意单独声明一个函数名字

   ```js
   setTimeout(function() {
     console.log('延迟执行');
   }, 1000);
   ```

   这里的函数只会执行一次，给它起名字完全没必要。

2. **代码简洁**
    匿名函数可以直接写在需要的位置上，不用提前写一堆单独的命名函数，让逻辑集中在一起，更好读。

   ```js
   [1, 2, 3].forEach(function(item) {
     console.log(item);
   });
   ```

3. **封装作用域（闭包）**
    匿名函数经常用来立即执行（IIFE：Immediately Invoked Function Expression），形成**自己的作用域**，避免变量污染全局环境。

   ```js
   (function() {
     var a = 10;
     console.log(a);
   })();
   console.log(a); // 报错，a没有泄露到外面
   ```

4. **灵活组合**
    匿名函数可以作为**参数**，**返回值**，更方便做**函数式编程**。

   ```js
   function add(x) {
     return function(y) { // 返回一个匿名函数
       return x + y;
     }
   }
   
   const add5 = add(5);
   console.log(add5(3)); // 输出 8
   ```

------

匿名函数的缺点

- **调试困难**：没有名字，报错时 stack trace（堆栈追踪）不好看。
- **复用性差**：只能用一次，不能多处调用。
- **可读性差**：如果写得太长或者嵌套太深，代码难读。



 JavaScript 中的一些简写技巧，常用于提高代码的可读性和简洁性，尤其在对象的构建过程中。

1. **对象的 `key` 和 `value` 相同的简写**

如果对象的 **属性名（key）** 和 **属性值（value）** 是相同的变量名，那么你可以省略 `key: value` 的写法，直接写成 `key`，让代码更简洁。

示例：

```js
let name = "Alice";
let age = 25;

let person = {
  name,  // 等价于 name: name
  age    // 等价于 age: age
};

console.log(person);  // { name: "Alice", age: 25 }
```

**解释**：

- 这是 ES6 引入的对象简写方式。如果对象的 **key 和 value** 变量名相同，可以直接写 `name`，JavaScript 会自动理解为 `name: name`。
- 这种写法对于**定义对象时**，变量名和属性名一致的情况特别有用，可以减少重复代码。

------

2. **函数名与对象的 `key` 相同时的简写**

在对象中，如果 **key 是函数名**，那么可以省略 `functionName: functionName`，只写 **函数名**。

示例：

```js
let greet = function() {
  console.log("Hello!");
};

let person = {
  greet  // 等价于 greet: greet
};

person.greet();  // 输出: Hello!
```

**解释**：

- 如果对象的属性值是函数，而且属性名和函数名相同，可以省略属性名，只写函数名。JavaScript 会自动推断出 `greet: greet`。

------

**这两种写法在工作中常用吗？**

**常见情况**：

- **构建配置对象**：在构建配置对象、传递参数时，尤其是当传入的参数变量名和对象的属性名相同时，常常使用这种简写。例如：`{ width, height }`，如果这两个变量是已经定义好的，它们就会自动作为对象的属性。

- **函数和事件处理**：当你有一个事件处理函数或方法，并且它的名字和对象属性相同的时候，也经常使用这种简写。比如说在 React 中，经常见到类似于这种简写：

  ```js
  const handleClick = () => { console.log('Clicked!'); };
  const button = {
    handleClick // 等价于 handleClick: handleClick
  };
  ```

**是否常用**：

- **常用**：尤其在构建对象、写配置文件、传递函数参数等场景中，简写使得代码更加简洁和清晰。
- **适当使用**：虽然很方便，但并不是所有场景下都适用，特别是当对象的属性名和变量名不同的时候，这种简写就无法使用。因此要根据具体情况，判断是否适用。

------







### 回调函数

回调函数（**Callback Function**）是 JavaScript 中非常重要的概念，它指的是**作为参数传递给其他函数的函数**，并在某些条件下或某个时刻被调用。回调函数通常用于处理异步操作，尤其是在执行完某个任务后，执行某个特定操作。

1. **回调函数的基本概念**

**回调函数**就是**一个函数**，它作为**参数**传递给另一个函数，并且在特定时机被“回调”执行。这个回调函数通常是在执行异步操作（如文件读取、网络请求、定时器等）时被调用。

2. **回调函数的基本用法**

回调函数的基本用法可以通过下面的例子来说明：

```js
function greet(name, callback) {
  console.log("Hello, " + name + "!");
  callback();  // 调用回调函数
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);
// 输出:
// Hello, Alice!
// Goodbye!
```

在上面的例子中：

- `greet` 是一个接收两个参数的函数，第一个是名字，第二个是回调函数。
- `sayGoodbye` 就是传递给 `greet` 的回调函数，它会在 `greet` 执行完 `console.log` 后被执行。

3. **回调函数的常见用途**

回调函数在 JavaScript 中广泛用于处理**异步操作**，特别是在以下场景中：

3.1 **异步操作（如定时器、网络请求）**

例如，使用 `setTimeout` 来设置一个延时操作：

```js
setTimeout(function() {
  console.log("This message is shown after 2 seconds!");
}, 2000);
```

在这个例子中，匿名函数是一个回调函数，它将在延时 2 秒后执行。

3.2 **事件处理**

回调函数也常用于处理用户交互，比如点击事件、键盘事件等：

```js
document.getElementById("myButton").addEventListener("click", function() {
  console.log("Button clicked!");
});
```

这里，匿名函数是一个回调函数，它在按钮被点击时执行。

3.3 **数组方法（如 `forEach`）**

许多数组方法也接受回调函数作为参数。例如，`forEach` 方法接受一个回调函数，遍历数组中的每一项：

```js
let numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(number) {
  console.log(number);
});
// 输出：1, 2, 3, 4, 5
```

3.4 **回调函数的执行顺序**

回调函数的执行时机通常是**异步的**，也就是说它会等到当前的操作执行完成后再执行。所以如果你有多个异步操作，它们的执行顺序可能与书写顺序不同，甚至可能发生回调地狱（Callback Hell）问题。

示例（回调函数的顺序）：

```js
console.log("Start");

setTimeout(function() {
  console.log("This is the first callback!");
}, 2000);

setTimeout(function() {
  console.log("This is the second callback!");
}, 1000);

console.log("End");
// 输出:
// Start
// End
// This is the second callback!
// This is the first callback!
```

3.5 **回调地狱（Callback Hell）**

回调函数虽然方便，但当你需要进行多个异步操作时，容易出现嵌套过深的回调函数，称为**回调地狱**，即回调函数的层级过多，代码变得难以维护。

示例（回调地狱）：

```js
doSomething(function() {
  doSomethingElse(function() {
    doAnotherThing(function() {
      doFinalThing(function() {
        console.log("Done!");
      });
    });
  });
});
```

这段代码的可读性很差，也很难维护和调试。为了避免回调地狱，**Promise** 和 **async/await** 提供了更好的异步控制方式。

------

3.6**回调函数与函数式编程**

回调函数在**函数式编程**中有着广泛应用，它支持将函数作为参数传递给其他函数，允许你编写更灵活的代码。通过回调，你可以实现许多功能，比如过滤、映射、归约等操作。

```js
let numbers = [1, 2, 3, 4, 5];

// 使用回调函数实现过滤操作
let evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});

console.log(evenNumbers); // [2, 4]
```

在这个例子中，`filter` 方法接受一个回调函数，根据该回调函数的返回值来决定是否包含元素。

------

3.7 **回调函数的优缺点**

**优点**：

- **异步处理**：回调函数使得 JavaScript 能够有效处理异步操作（如网络请求、文件读取等）。
- **灵活性**：回调函数可以根据需求在执行某些操作后自定义行为。

**缺点**：

- **回调地狱**：当多个回调嵌套时，代码可读性差，难以维护，容易出错。
- **错误处理**：回调函数的错误处理有时比较复杂，尤其是在多个异步操作中。

------

3.8**如何避免回调地狱？**

1. **使用 Promise**： Promise 可以让异步操作的链式调用更加清晰，避免回调地狱。

   ```js
   doSomething()
     .then(() => doSomethingElse())
     .then(() => doAnotherThing())
     .then(() => doFinalThing())
     .then(() => console.log("Done!"))
     .catch(error => console.log(error));
   ```

2. **使用 async/await**： `async/await` 是基于 Promise 的语法糖，让异步代码看起来像同步代码，从而避免回调地狱。

   ```js
   async function execute() {
     try {
       await doSomething();
       await doSomethingElse();
       await doAnotherThing();
       await doFinalThing();
       console.log("Done!");
     } catch (error) {
       console.log(error);
     }
   }
   
   execute();
   ```

------





在 API 调用中，**对象作为参数和回调函数**一起使用，是非常常见的模式。特别是在一些异步操作中，我们经常通过将回调函数作为对象的一部分传递给另一个函数或 API，来完成特定的任务或操作。这样可以使得 API 接口更加灵活，同时还能够处理不同的任务。

1. **回调函数作为对象的一部分**

在许多异步 API 或库中，我们可能需要将回调函数作为对象的属性传递。这种做法通常用于传递多个相关的配置项和回调函数。通过将回调函数包含在对象中，我们能够让代码更加整洁、易于维护。

示例：回调函数作为对象参数的一部分

```js
function fetchData({ url, method, onSuccess, onError }) {
  // 模拟异步 API 调用
  setTimeout(() => {
    if (method === "GET") {
      onSuccess(`Data fetched from ${url}`);
    } else {
      onError("Invalid method");
    }
  }, 1000);
}

// 使用回调函数
fetchData({
  url: "https://api.example.com/data",
  method: "GET",
  onSuccess: function (data) {
    console.log("Success:", data);
  },
  onError: function (error) {
    console.log("Error:", error);
  }
});
```

**解释**：

- 在 `fetchData` 函数中，我们将 `onSuccess` 和 `onError`（回调函数）作为对象的属性传入。
- 当请求成功时，`onSuccess` 回调会被调用。
- 当请求失败时，`onError` 回调会被调用。

这种方式使得我们可以灵活地将不同的回调函数传递到函数内部处理，同时也使得函数参数更加组织化、可扩展。

------

2. **传递多个回调函数和其他配置项**

有时候我们需要传递多个回调函数和额外的配置参数，使用对象作为参数传递回调函数就显得非常合适。通过对象封装回调函数和其他配置项，不仅能减少函数签名的复杂度，还能提供更多灵活性。

示例：传递多个回调函数和配置项

```js
function processOrder({ orderId, onProcess, onComplete, onError }) {
  console.log(`Processing order #${orderId}...`);

  // 模拟异步过程
  setTimeout(() => {
    const isSuccess = Math.random() > 0.5; // 模拟随机成功或失败
    if (isSuccess) {
      onProcess("Processing started...");
      setTimeout(() => {
        onComplete("Order processed successfully!");
      }, 1000);
    } else {
      onError("Error processing order.");
    }
  }, 1000);
}

// 调用函数并传递回调
processOrder({
  orderId: 1234,
  onProcess: function (message) {
    console.log(message);
  },
  onComplete: function (message) {
    console.log(message);
  },
  onError: function (error) {
    console.log(error);
  }
});
```

**解释**：

- `processOrder` 函数需要处理订单，并且有多个步骤（例如：`onProcess`、`onComplete`、`onError`）。
- 通过对象将多个回调函数传递进去，可以清晰地看到不同阶段的回调，并且可以灵活地控制每个阶段的操作。

这种方式的好处是，你可以根据需要灵活地调整回调函数，也可以根据需要传递额外的配置。

------

3. **简化和管理异步流程**

使用回调函数和对象作为参数一起，特别适合需要处理多个异步操作的场景。我们可以通过对象传递多个回调函数，来确保每个异步操作完成后的不同处理。这种方式让异步操作变得更加有序，容易管理。

示例：多个异步操作

```js
function asyncOperation({ step, onSuccess, onFailure }) {
  console.log(`Starting step: ${step}`);

  setTimeout(() => {
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      onSuccess(`Step ${step} completed successfully!`);
    } else {
      onFailure(`Step ${step} failed!`);
    }
  }, 1000);
}

function startProcess() {
  const steps = ["Step 1", "Step 2", "Step 3"];

  steps.forEach((step, index) => {
    asyncOperation({
      step: step,
      onSuccess: (message) => {
        console.log(message);
        if (index === steps.length - 1) {
          console.log("All steps completed!");
        }
      },
      onFailure: (message) => {
        console.error(message);
        console.log("Stopping process due to failure.");
      }
    });
  });
}

startProcess();
```

**解释**：

- 在这个例子中，`asyncOperation` 函数处理每个步骤，并接受多个回调（`onSuccess` 和 `onFailure`）来处理不同的结果。
- `startProcess` 函数管理多个步骤，每个步骤的异步操作使用回调函数来处理完成的动作。

------

4. **好处：**

**清晰的代码结构**：

- 将回调函数封装在对象中，能够提高代码的结构清晰度，让你知道每个参数的作用。
- 比如在复杂的异步 API 调用中，回调函数不仅可以控制执行流程，还可以处理不同的结果和错误，而使用对象可以使参数的传递更具语义。

**灵活的错误处理**：

- 通过回调函数和对象的组合，我们可以更灵活地处理错误。例如，如果有多个回调函数，程序可以根据不同的错误类型执行不同的回调。

**易于扩展**：

- 使用对象封装回调函数后，未来如果需要添加新的回调（比如`onError`、`onProgress`等），只需要在对象中增加新属性即可，不需要修改函数的签名。

------

**总结**：

- **对象作为参数与回调函数结合使用**的主要好处在于**代码的结构更加清晰和灵活**，尤其在异步操作中，多个回调函数和配置项可以一起传递。
- 这种方式让函数更加易于扩展，不仅能避免函数签名过长，也能使得代码更具可维护性。
- 常用于 API 调用和异步流程管理的场景。



### 数组内置方法

```js
const arr = [1, 2, 3, 4, 5];
const arr1 = [{name: 1}, {name: 2}, {name:3}];
// 1.数组遍历
// const callback = function(a, b, arr) {
//   console.log(a, b, arr);
// }
// arr.forEach(callback);

//引用类型在做copy时，只是copy了引用地址，浅拷贝
//深拷贝：新建一个对象，把原对象的属性值copy过来
//const test = arr1[0];  //浅拷贝
const test = {                         //深拷贝
    name: arr1[0].name,
}
test.name = 2;



// arr1.forEach(function(item) {
//     //如果原数组中的item是引用类型，直接修改item的属性值会影响原数组中的item
//     //如果原数组中的item是基本类型，直接修改item的属性值不会影响原数组中的item
//     //一般情况下不这么做
//     item.name = item.name + 1;
//     console.log(item.name);
// })
// console.log(arr1); 



//2.数组的map方法
const newarr1 = arr1.map(function(item) {
    console.log(item)
    return {name:item.name + 1}; //返回一个新对象，原数组不变
})
console.log(newarr1); 
console.log(arr1); //原数组不变


//3. Arry.isArray()方法
//4.every()方法
const result = arr.every(function (item) {
    return item > 0; //判断数组中的每个元素是否都大于0
})
console.log(result); //true

//5.find()方法,找到第一个符合条件的元素，没找到返回undefined

const result1 = arr.find(function (item) {
    return item > 3; //返回第一个大于3的元素
})
console.log(result1); //4

//6.findIndex()方法,找到第一个符合条件的元素的索引，没找到返回-1
const result2 = arr.findIndex(function (item) {
    return item > 3; //返回第一个大于3的元素的索引
})
console.log(result2); //3 

//7.includes()方法,判断数组中是否包含某个元素，返回true或false
const result3 = arr.includes(3); //判断数组中是否包含3
console.log(result3); //true

//8.filter()方法,返回一个新数组，包含所有符合条件的元素
const arr3 = [{name:'1', isVip: true}, {name:'2', isVip: false}, {name:'3', isVip: true}]
const result4 = arr3.filter(function (item) {
    return item.isVip; //返回所有isVip为true的元素
})
console.log(result4); //[{name:'1', isVip: true}, {name:'3', isVip: true}]

//9.数据扁平化
const arr4 = [1, 2, [3, 4], [5, 6]];
const result5 = arr4.flat(1); //扁平化一层
console.log(result5); //[1, 2, 3, 4, 5, 6]

//10. join()方法,将数组转换为字符串，默认用逗号分隔
const arr5 = [1, 2, 3, 4, 5];
const result6 = arr5.join('-'); //用-分隔
console.log(result6); //1-2-3-4-5

// 10. sort()方法,对数组进行排序，默认按字典序排序
const arr6 = [3, 1, 4, 2, 10, 5];
//const result7 = arr6.sort(); //按字典序排序
const result7 = arr6.sort(function (a, b) {
    return a - b; //按数字大小排序
})
console.log(result7); //[1, 2, 3, 4, 5, 10]

//11.slice()方法,返回一个新数组，包含指定范围的元素
const arr7 = [1, 2, 3, 4, 5];
const result8 = arr7.slice(1, 4); //返回索引1到索引4的元素，不包括索引4
console.log(result8); //[2, 3, 4]

//12.删除元素splice()方法,返回一个新数组，包含指定范围的元素
const arr8 = [1, 2, 3, 4, 5];
const result9 = arr8.splice(1, 2); //删除索引1到索引2的元素，返回删除的元素
console.log(result9); //[2, 3]
console.log(arr8); //[1, 4, 5] //原数组被修改了
// 13.添加元素splice()方法,返回一个新数组，包含指定范围的元素
const arr9 = [1, 2, 3, 4, 5];
const result10 = arr9.splice(1, 0, 6); //在索引1的位置插入6，删除0个元素，返回删除的元素
console.log(result10); //[]
```



### 字符串方法

```js
const str1 = '1234'
console.log(str1[3])

//2.concat()方法,数组也有
const str2 = '5678'
const str3 = str1.concat(str2) //连接两个字符串
console.log(str3) //12345678

//3.endwith()方法,判断字符串是否以某个字符串结尾
const result = str1.endwith('34') //true
console.log(result) //true

//4.includes()方法,判断字符串中是否包含某个字符串，返回true或false
const result1 = str1.includes('23') //true
console.log(result1) //true

//5.indexOf()方法,返回字符串中某个字符串第一次出现的位置，没找到返回-1
const result2 = str1.indexOf('23') //1
console.log(result2) //1

//6.match()方法,返回字符串中符合正则表达式的结果，没找到返回null
const h1 = '<h1>{{ msg }}</h1>'
const msg = 'hello';

//7.replace()方法,替换字符串中的某个字符串
const result3 = str1.replace('23', '99') //替换字符串中的23为99
console.log(result3) //1994

//8.slice()方法,截取字符串中的某个部分,返回一个新字符串
const result4 = str1.slice(1, 3) //截取字符串中的第1到第3个字符
console.log(result4) //23

//9.split()方法,把字符串分割成数组
const str4 = 'sad alsdkg aldksg cnv adlg '
const result5 = str4.split(' ') //把字符串分割成数组，分隔符为2
console.log(result5)//['sad', 'alsdkg', 'aldksg', 'cnv', 'adlg', '']

//10.substring ()方法,截取字符串中的某个部分,返回一个新字符串
const result6 = str1.substring(1, 3) //截取字符串中的第1到第3个字符
console.log(result6) //23

 //11.toLowerCase()方法,把字符串转换为小写字母
const result7 = str1.toLowerCase() //把字符串转换为小写字母
console.log(result7) //1234
//12.toUpperCase()方法,把字符串转换为大写字母
const result8 = str1.toUpperCase() //把字符串转换为大写字母
console.log(result8) //1234
//13.trim()方法,去掉字符串两端的空格
const str5 = '   1234   '
const result9 = str5.trim() //去掉字符串两端的空格
console.log(result9) //1234


```



### 模板字面量

`"${url}"` 是 **模板字面量（Template Literal）** 的一种语法，允许在字符串中插入变量或表达式。它是 ES6 引入的一个非常方便的特性，帮助我们在字符串中动态地嵌入值或执行计算。

为什么使用 `${url}`？

在你的代码中：

```javascript
onSuccess(`Data fetched from ${url}`);
```

`"${url}"` 允许你把 `url` 变量的值动态地嵌入到字符串中。这个语法使用了 **模板字面量** 来定义一个字符串，并使用 `${}` 来插入表达式或变量。（注意不是用引号包裹，不然会被识别为字符串。

具体作用：

- **`${}`** 是占位符，它将表达式的结果（在这个例子中是 `url` 的值）嵌入到字符串中。
- **`url`** 是一个变量，代表 URL 地址。

假设：

```javascript
let url = "https://api.example.com/data";
```

那么：

```javascript
onSuccess(`Data fetched from ${url}`);
```

会将 `url` 变量的值（`"https://api.example.com/data"`）嵌入到字符串中，最终的输出是：

```
Data fetched from https://api.example.com/data
```

传统的字符串拼接：

在 ES6 之前，我们通常用字符串拼接来实现相同的功能：

```javascript
onSuccess("Data fetched from " + url);
```

虽然也能得到相同的结果，但模板字面量的方式更直观、易读，尤其是当插入多个变量时，代码更加简洁。

优势：

1. **简洁**：使用模板字面量比传统的字符串拼接更加简洁，减少了代码的冗余。
2. **易读**：模板字面量使得插入变量的意图更加明确，提升了代码的可读性。
3. **支持多行字符串**：模板字面量允许字符串跨多行，而不需要使用 `\n` 来换行。

例如，使用模板字面量：

```javascript
let text = `This is a 
multi-line string
with variables ${url}`;
```

传统方式：

```javascript
let text = "This is a\nmulti-line string\nwith variables " + url;
```





### 闭包

**闭包** 是指一个函数能够“记住”并**访问**其定义时的作用域，即使这个函数是在其定义的作用域之外执行的。换句话说，闭包允许函数在外部函数执行完之后，依然能够访问外部函数的变量。闭包=函数+外部的环境

```js
const obj = {
    name:1
}
//此函数执行时一定要有obj，即一定要有外部数据（环境）
function closure() {
    console.log(obj)
}

//正常的函数
function simpleFn(obj) {
    console.log(obj)
}
```



闭包的核心是：**函数能记住它创建时的作用域链（包括外部函数的局部变量）**。

为什么会有闭包？

在 JavaScript 中，函数是**一等公民**，意味着函数可以作为参数传递、作为返回值返回。当一个函数返回一个函数时，**返回的函数仍然能够访问外部函数的变量**，这就是闭包的基本概念。

基本闭包例子：

```javascript
function outerFunction() {
  let outerVariable = "I am from outer function";
  
  function innerFunction() {
    console.log(outerVariable);  // 这里访问了外部函数的变量
  }
  
  return innerFunction;
}

const closureFunc = outerFunction();
closureFunc();  // 输出: "I am from outer function"
```

解释：

1. `outerFunction` 中声明了一个局部变量 `outerVariable`。
2. `outerFunction` 返回了一个内部的 `innerFunction`。
3. 当 `outerFunction` 执行完毕并返回时，`innerFunction` 仍然**保持对 `outerVariable` 的访问权限**，即使 `outerFunction` 已经执行完毕。这个现象就称为“闭包”。

闭包的常见用法

1. **数据封装与私有变量**

闭包可以用于创建私有变量，让外部无法直接访问变量，只能通过特定的方法来访问和修改变量。

```javascript
function createCounter() {
  let count = 0;  // 私有变量
  return {
    increment: function() {
      count++;
      console.log(count);
    },
    decrement: function() {
      count--;
      console.log(count);
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // 输出: 1
counter.increment();  // 输出: 2
counter.decrement();  // 输出: 1
console.log(counter.getCount());  // 输出: 1
```

解释：

- `createCounter` 返回一个对象，这个对象拥有访问和修改 `count` 的方法（`increment`、`decrement`、`getCount`）。
- `count` 是闭包中的私有变量，外部无法直接修改它，只有通过提供的公共方法才能访问它。

1. **函数工厂：动态创建函数**

闭包常用于创建动态的函数。通过将外部变量作为参数，生成不同的函数。

```javascript
function multiplyBy(factor) {
  return function(num) {
    return num * factor;
  };
}

const multiplyBy2 = multiplyBy(2);
const multiplyBy5 = multiplyBy(5);

console.log(multiplyBy2(4));  // 输出: 8
console.log(multiplyBy5(4));  // 输出: 20
```

解释：

- `multiplyBy` 是一个工厂函数，它接受一个参数 `factor`，并返回一个新的函数。
- 返回的函数能够记住它被创建时的 `factor` 值，从而对不同的 `num` 进行相应的计算。

1. **事件处理与回调函数**

在事件处理或异步回调中，闭包允许你访问和更新函数外部的变量。

```javascript
function createButton(buttonId) {
  let clickCount = 0;  // 每个按钮的点击次数
  const button = document.createElement('button');
  button.textContent = `Button ${buttonId}`;
  
  button.addEventListener('click', function() {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times`);
  });
  
  document.body.appendChild(button);
}

createButton(1);  // 创建一个按钮，并记录点击次数
createButton(2);  // 创建另一个按钮，并记录点击次数
```

解释：

- 每次调用 `createButton` 都会创建一个新的闭包，并且每个按钮都有独立的 `clickCount` 变量。
- 当用户点击按钮时，点击次数会增加，而闭包确保每个按钮的点击计数是独立的。

1. **延迟执行（setTimeout）**

闭包也常用于控制延迟执行的场景，特别是在循环中时，闭包确保每次回调函数访问到正确的值。

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 输出: 0, 1, 2
  }, 1000);
}
```



总结：闭包的特点和常见用法

1. **闭包的特点**：函数可以“记住”并访问其创建时的作用域变量，即使该函数在外部作用域执行。
2. **常见用法**：
   - 数据封装和私有变量（避免外部直接修改）
   - 动态创建函数（函数工厂）
   - 事件处理和回调函数（保持对外部变量的引用）
   - 延迟执行（如 `setTimeout` 和 `setInterval`）
3. **优点**：闭包使得 JavaScript 中的异步操作和事件驱动更容易管理，同时可以实现数据封装、模块化等设计模式。

闭包是 JavaScript 中非常强大和常用的特性，它使得函数不仅仅是执行代码，还能“记住”它的执行环境，从而提供更多的灵活性和控制。



### 柯里化

> **柯里化**就是把接受多个参数的函数**转换成**一系列**只接收一个参数**的函数，并且每次调用返回一个新的函数，直到所有参数都被处理完为止。

------

🧠 举个简单例子（未柯里化）：

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));  // 输出：5
```

这是一个普通的函数，它接受两个参数 `a` 和 `b`。

------

✅ 柯里化版本：

```javascript
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(2)(3));  // 输出：5
```

- `curriedAdd(2)` 返回一个新函数（记住了 `a = 2`）
- 再调用这个函数时传入 `b = 3`
- 最终返回 `2 + 3 = 5`

可以把“柯里化”理解成**参数拆包** + **记住参数** + **分步调用**。

✅ 柯里化 vs 普通函数：

| 特性         | 普通函数           | 柯里化函数           |
| ------------ | ------------------ | -------------------- |
| 参数接收方式 | 一次性接收全部参数 | 每次接收一个参数     |
| 调用方式     | `f(a, b)`          | `f(a)(b)`            |
| 灵活性       | 一般               | 更高：可复用、可组合 |

------

✅ 实际用处：函数复用、函数组合、偏函数

1. **函数复用**示例：

```javascript
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 输出：10
console.log(triple(5)); // 输出：15
```

- `double` 是把 `2` 固定为第一个参数后的函数。
- 你可以反复使用它对不同的数乘以 2 —— 这就是柯里化带来的“复用”好处。

2. **配合高阶函数**：

```javascript
function isGreaterThan(min) {
  return function(num) {
    return num > min;
  };
}

const isAdult = isGreaterThan(18);

console.log([10, 20, 30].filter(isAdult));  // 输出：[20, 30]
```

------

✅ 自动柯里化工具（如 lodash）：

用 lodash 中的 `_.curry`：

```javascript
const _ = require('lodash');

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = _.curry(sum);

console.log(curriedSum(1)(2)(3)); // 输出：6
```

------

✅ 总结：

- **柯里化**是一种**将多参数函数转为单参数函数链式调用的技术**；
- 它让函数变得**更灵活、更易复用**；
- 常用于**函数式编程、事件处理、高阶函数场景**；
- 柯里化并不会改变最终的功能，只是改变了函数接收参数的方式。

------



### 正则表达式

### 错误处理

### 原型和原型链

![image-20250704095901076](/frontend.assets/image-20250704095901076.png)

1. **什么是原型链？**
   - **原型链** 是 JavaScript 中实现继承的机制。它是一个对象的内部属性，指向另一个对象，这样就形成了一个链式结构。
   - 每个对象都有一个 `[[Prototype]]`（原型）属性，指向其构造函数的 `prototype` 属性。
   - 当访问对象的属性时，JavaScript 引擎会沿着原型链查找该属性，如果在当前对象上没有找到，就会查找其原型（即 `prototype`），直到 `Object.prototype` 为止。
2. **原型链的结构**：
   - **每个对象都有一个原型**（通过 `__proto__` 或 `Object.getPrototypeOf(obj)` 获取）。
   - 这个原型本身也是一个对象，具有自己的原型（形成链式结构）。
   - 原型链的顶端是 `Object.prototype`，它是所有 JavaScript 对象的最终原型。
3. **查找属性的过程**：
   - 当你访问一个对象的属性时，JavaScript 会从对象自身查找，如果没有找到，则会沿着原型链查找，直到找到或者到达 `Object.prototype` 为止。
   - 如果在原型链的末端仍然没有找到该属性，返回 `undefined`。
4. **`prototype` 与 `__proto__`**：
   - 每个 **函数对象** 都有一个 `prototype` 属性，用于指向该函数创建的对象的原型。
   - 每个 **实例对象** 有一个 `__proto__` 属性，它指向该实例的构造函数的 `prototype` 属性。
5. **示例**：

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const dog = new Animal('Buddy');
dog.sayHello();  // 输出：Hello, my name is Buddy

console.log(dog.__proto__ === Animal.prototype);  // true
console.log(Animal.prototype.__proto__ === Object.prototype);  // true
```

- **原型链** 解释：
  - `dog` 实例没有 `sayHello` 方法，但它通过 `dog.__proto__` 访问到 `Animal.prototype` 上的方法。
  - `Animal.prototype` 的原型是 `Object.prototype`，这是所有对象的最终原型。

1. **原型链的继承**：
   - 通过修改对象的 `prototype` 属性，可以实现继承。例如，子类的 `prototype` 指向父类的实例对象，实现属性和方法的共享。
2. **原型链的顶端：`Object.prototype`**：
   - 所有对象最终都会继承自 `Object.prototype`，这意味着所有对象都能访问到 `Object.prototype` 上的属性和方法，如 `toString()`、`hasOwnProperty()` 等。
3. **总结**：
   - **原型链** 是 JavaScript 用来实现继承的基础，每个对象的原型上包含了它继承的方法和属性。
   - 访问属性时，JavaScript 引擎会沿着原型链查找属性。
   - 了解原型链有助于你理解 JavaScript 的继承机制、性能优化和调试。
   - **只用了解即可，完全可以直接使用 JavaScript 的继承机制**，尤其是使用 **ES6 的 `class` 语法**，它使得继承和面向对象编程变得更加简洁和易读。`class` 语法在背后仍然是通过原型链来实现继承的，但它为你**封装了底层的原型链操作**，让你不需要手动操作 `prototype`。



### call，apply，bind改变this指向

一、**为什么要有 call / apply / bind？**

JavaScript 中函数内部的 `this` 会根据调用方式改变，有时候我们需要**手动控制 `this` 指向**，这就是 `call`、`apply`、`bind` 存在的意义。

------

二、基础定义 + 用和不用的区别

------

📌 1. `call`：**立即调用函数，并指定 this**

✅ 用法：

```js
function greet(msg) {
  console.log(`${msg}, I’m ${this.name}`);
}
const person = { name: "Alice" };
greet.call(person, "Hello");
```

输出：`Hello, I’m Alice`

❌ 不用 `call`：

```js
function greet(msg) {
  console.log(`${msg}, I’m ${this.name}`);
}
greet("Hi");
//Hi, I’m undefined
```

✅ `call` 解决的问题：**强制改变函数内部的 `this`，让它不受调用方式的影响。**

------

📌 2. `apply`：**与 call 相同，但参数以数组形式传入**

✅ 用法：

```js
function sum(a, b) {
  return a + b;
}
console.log(sum.apply(null, [3, 5])); // 8
```

❌ 不用 apply：

```js
const arr = [3, 5];
sum(arr); // NaN
```

✅ `apply` 解决的问题：**适合处理函数参数已是数组的情况（如：Math.max）**

------

📌 3. `bind`：**返回一个新函数，`this` 永久绑定，但不会立即执行**

✅ 用法：

```js
function sayHi() {
  console.log(this.name);
}
const user = { name: "Bob" };
const boundHi = sayHi.bind(user);
boundHi(); // Bob
```

❌ 不用 bind（尤其在事件中）：

```js
const obj = {
  name: "Tester",
  say: function () {
    setTimeout(function () {
      console.log(this.name); // undefined 或 window.name
    }, 1000);
  }
};
obj.say();
```

✅ `bind` 解决的问题：**让异步/回调/事件处理中的 `this` 保持不变**

------

三、项目中最常见的实际应用场景（用和不用对比）

------

✅ 场景 1：事件监听回调中丢失 `this`（用 `bind`）

```js
class Button {
  constructor() {
    this.text = "Click Me";
  }

  handleClick() {
    console.log(this.text);
  }

  mount() {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", this.handleClick); // ❌ this 是 button 元素
    // btn.addEventListener("click", this.handleClick.bind(this)); // ✅ 修正 this
  }
}
```

✅ 用 `bind` 后 `this.text` 正确指向实例，避免 `undefined`。

------

✅ 场景 2：借用方法处理类数组（用 `call`）

```js
function toArray() {
  return Array.prototype.slice.call(arguments);
}
console.log(toArray(1, 2, 3)); // [1, 2, 3]
```

✅ `arguments` 是类数组，不能直接用 `slice()`，用 `call` 借用数组的方法。

------

✅ 场景 3：多参数情况下调用函数（用 `apply`）

```js
const nums = [3, 6, 9, 2];
const max = Math.max.apply(null, nums); // ✅ apply 展开数组
console.log(max); // 9
```

❌ 如果不用 apply，只能手动解构参数或遍历。

------

✅ 场景 4：函数柯里化（用 `bind` 预填参数）

```js
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

✅ `bind` 用于创建“半函数”，适合函数式编程场景。

------

四、记忆对比表格

| 方法    | 是否立即执行 | 参数形式       | 用途关键词                 |
| ------- | ------------ | -------------- | -------------------------- |
| `call`  | ✅ 是         | 参数用逗号分隔 | 调用函数时手动设定 this    |
| `apply` | ✅ 是         | 参数用数组     | 参数已是数组时调用函数     |
| `bind`  | ❌ 否         | 参数用逗号分隔 | 生成新函数、保留 this 绑定 |

------

五、总结：项目开发中用不用的区别

| 场景                       | 不使用时问题                  | 使用后的效果                |
| -------------------------- | ----------------------------- | --------------------------- |
| 回调函数或事件处理         | `this` 丢失，无法访问对象属性 | `bind(this)` 保证作用域一致 |
| 类数组（如 arguments）处理 | 无法直接使用数组方法          | `call/apply` 借用数组方法   |
| 不确定参数数量的函数调用   | 需要手动拆数组                | `apply` 可一键展开          |
| 函数预设参数               | 无法保存特定上下文/参数       | `bind` 返回预置参数的新函数 |

------





### class类

基于原型链的继承方法，底层原理，ES6后主要使用基于class方法，主要有三个特性，继承封装多态

```js
class Persion {
    constructor(name , age) {
        //构造函数中仅放属性
        //属性是公开的
        this.name= name;
        this.age = age;


    }
    //方法
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

class Student extends Persion {
    constructor(name, age, school) {
        //调用父类的构造函数，若父类中有构造函数，子类必须调用父类的构造函数
        super(name, age);//调用父类的构造函数
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    setSchool(school) {
        this.school = school;
    }
}

const s1 = new Student('张三', 18, '清华大学');
const s2 = new Persion('李四', 19);
console.log(s1);
console.log(s2);
```



#### 私有属性实现

在 JavaScript 中，类的属性通常是公开的（即外部可以直接访问和修改）。但在很多场景下，我们希望某些属性仅限于类内部访问，不被外部直接修改，这就是**私有属性**的概念。

在 ES6 中，JavaScript 类本身并没有内建的机制来定义 **私有属性**。不过，有几种方法可以模拟私有属性的行为。

1. **通过 `_` 前缀约定私有属性（最传统的做法）**

一种常见的做法是通过给属性添加 `_` 前缀，作为约定，表示这个属性是私有的，不应该在类外部访问和修改。

示例：

```js
class Person {
    constructor(name, age) {
        // 公有属性
        this.name = name;
        
        // 私有属性，通过下划线命名约定
        this._age = age;
    }

    // 公有方法
    getAge() {
        return this._age;
    }

    // 公有方法，修改私有属性
    setAge(age) {
        if (age < 0) {
            console.log('Age cannot be negative');
        } else {
            this._age = age;
        }
    }
}

const person = new Person('Alice', 30);

console.log(person.name);  // Alice
console.log(person._age);  // 30（虽然前缀是 _ ，表示私有属性，但仍然能访问）

person.setAge(35);
console.log(person.getAge());  // 35
```

- 这种方式是通过约定来标识“私有”，其实这个属性依然是可以在外部访问的，只是我们通常不建议这么做。
- 使用 `_age` 来标识私有属性，提供了 **getter** 和 **setter** 方法来控制访问和修改。

**2. 通过 `Symbol` 模拟私有属性**

`Symbol` 是 ES6 引入的一个新数据类型，`Symbol` 可以用来创建唯一的属性名，防止外部通过普通的 `this.xxx` 访问私有属性。

```js
const ageSymbol = Symbol('age');

class Person {
    constructor(name, age) {
        this.name = name;
        this[ageSymbol] = age;
    }

    // 公有方法
    getAge() {
        return this[ageSymbol];
    }

    // 公有方法，修改私有属性
    setAge(age) {
        if (age < 0) {
            console.log('Age cannot be negative');
        } else {
            this[ageSymbol] = age;
        }
    }
}

const person = new Person('Alice', 30);

console.log(person.name);  // Alice
console.log(person[ageSymbol]);  // 30, 但这种访问方式并不常见

person.setAge(35);
console.log(person.getAge());  // 35
```

- `Symbol('age')` 创建了一个独一无二的 `Symbol` 值，作为对象的属性名。
- 通过这种方式，`age` 属性无法被普通的代码访问到（除非直接访问符号），因此它实现了类似私有属性的功能。

**3. 使用 `WeakMap` 来实现私有属性（更推荐的方式）**

`WeakMap` 是一个非常适合存储私有属性的结构，它允许我们将对象作为键（key），并存储与之对应的私有属性（值）。`WeakMap` 是一种引用类型，当对象没有被引用时，`WeakMap` 中的条目会被自动垃圾回收。

示例：

```js
const privateProps = new WeakMap();

class Person {
    constructor(name, age) {
        // 将私有属性存储在 WeakMap 中
        privateProps.set(this, { age });

        this.name = name;
    }

    // 公有方法
    getAge() {
        return privateProps.get(this).age;
    }

    // 公有方法，修改私有属性
    setAge(age) {
        if (age < 0) {
            console.log('Age cannot be negative');
        } else {
            privateProps.get(this).age = age;
        }
    }
}

const person = new Person('Alice', 30);

console.log(person.name);  // Alice
console.log(person.getAge());  // 30

person.setAge(35);
console.log(person.getAge());  // 35
```

- `privateProps` 是一个 **`WeakMap`**，它存储了对象 `this` 与私有属性的映射关系。
- `privateProps.set(this, { age })` 将每个 `Person` 实例与一个包含 `age` 的对象关联。
- 通过 `privateProps.get(this)` 访问到该实例的私有属性。
- 这种方式实现的私有属性是 **真正** 隐藏的，外部无法直接访问。

**4. 使用 ES2022 的私有字段（#）**

ES2022（ECMAScript 2022）引入了真正的私有字段语法，使用 `#` 前缀来定义类的私有属性。这个语法可以有效地让属性对外部代码不可见，确保私有数据的安全。

```js
class Person {
    // 使用 # 定义私有字段
    #age;

    constructor(name, age) {
        this.name = name;
        this.#age = age;  // 初始化私有字段
    }

    // 公有方法
    getAge() {
        return this.#age;
    }

    // 公有方法，修改私有属性
    setAge(age) {
        if (age < 0) {
            console.log('Age cannot be negative');
        } else {
            this.#age = age;
        }
    }
}

const person = new Person('Alice', 30);

console.log(person.name);  // Alice
console.log(person.getAge());  // 30

person.setAge(35);
console.log(person.getAge());  // 35

// 访问私有字段会报错
// console.log(person.#age);  // SyntaxError: Private field '#age' must be declared in an enclosing class
```



- `#age` 是一个私有字段，只能在类内部访问。
- 外部无法通过 `person.#age` 来访问私有属性，直接访问会抛出错误。
- 这种方式是 **原生支持的私有字段**，语法更加简洁且安全。

------



#### 继承封装多态

好的，我们来系统地讲解一下 **JavaScript** 中的 **面向对象三大特性**：**继承、封装、和多态**。

1. **封装 (Encapsulation)**

封装是面向对象编程的一个核心概念，它指的是将数据和对数据的操作方法捆绑在一起，并且隐藏类的内部实现，外部只能通过公开的接口（方法）来访问或修改数据。这有助于保护对象的内部状态不被外部直接修改，并提供清晰的 API 以便于使用和维护。

**封装的作用：**

- **隐藏实现细节**：外部只关心方法和接口，不需要知道具体的实现过程。
- **数据保护**：避免外部直接修改对象内部的状态，从而减少错误的发生。

**实现封装的方式：**

1. **使用构造函数和方法**：我们通过构造函数初始化属性，通过方法来操作这些属性。
2. **私有属性和方法**：ES6 后可以使用 `#` 来定义私有字段（私有属性）。

**代码示例：**

```js
class Person {
    // 私有字段
    #age;

    constructor(name, age) {
        this.name = name;
        this.#age = age;  // 通过构造函数初始化私有字段
    }

    // 公共方法来访问私有字段
    getAge() {
        return this.#age;
    }

    // 公共方法来设置私有字段
    setAge(age) {
        if (age < 0) {
            console.log('Age cannot be negative');
        } else {
            this.#age = age;
        }
    }
}

const person = new Person('Alice', 30);
console.log(person.name);  // Alice
console.log(person.getAge());  // 30

person.setAge(35);
console.log(person.getAge());  // 35

// 直接访问私有字段会报错
// console.log(person.#age);  // SyntaxError: Private field '#age' must be declared in an enclosing class
```

封装就是将数据和操作数据的方法封装到类中，并通过公开的方法访问私有数据。它帮助我们保护对象内部状态，同时提供简洁的接口。

------

2. **继承 (Inheritance)**

继承是面向对象编程中非常重要的概念，它允许我们通过子类继承父类的属性和方法。继承使得我们可以复用父类的代码，同时在子类中增加新的功能或修改父类的行为。

**继承的作用：**

- **代码复用**：通过继承，子类可以直接使用父类的属性和方法，避免重复代码。
- **扩展功能**：子类可以在继承父类功能的基础上，增加自己的特有功能。

**实现继承的方式：**

1. **通过 `class` 和 `extends` 关键字**：ES6 中提供了 `extends` 关键字来实现继承。
2. **`super()`**：子类必须通过 `super()` 调用父类的构造函数。

**代码示例：**

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`My name is ${this.name} and I am ${this.age} years old.`);
    }
}

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);  // 调用父类的构造函数
        this.school = school;
    }

    introduce() {
        super.introduce();  // 调用父类的方法
        console.log(`I study at ${this.school}.`);
    }
}

const student = new Student('Bob', 20, 'Harvard');
student.introduce();  // 调用子类的重写方法
// 输出:
// My name is Bob and I am 20 years old.
// I study at Harvard.
```

继承允许子类继承父类的属性和方法，并且可以扩展或重写父类的方法。通过继承，我们可以实现代码复用并且增强代码的灵活性。

------

3. **多态 (Polymorphism)**

多态指的是不同的对象可以通过相同的接口调用，表现出不同的行为。换句话说，多态使得相同的方法可以有不同的实现，这取决于对象的类型。

**多态的作用：**

- **统一接口**：多个不同的对象可以共享同一方法名，使用相同的接口，但实现不同的行为。
- **灵活性**：同样的方法可以适应不同类型的对象，增强了代码的扩展性和灵活性。

**实现多态的方式：**

1. **方法重写**：子类重写父类的方法，提供不同的实现。
2. **通过父类引用调用子类的方法**：即使我们用父类的引用调用方法，实际执行的是子类的方法。

**代码示例：**

```js
class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hi, my name is ${this.name}`);
    }
}

class Student extends Person {
    constructor(name, school) {
        super(name);
        this.school = school;
    }

    introduce() {
        console.log(`Hi, my name is ${this.name} and I study at ${this.school}`);
    }
}

class Teacher extends Person {
    constructor(name, subject) {
        super(name);
        this.subject = subject;
    }

    introduce() {
        console.log(`Hi, my name is ${this.name} and I teach ${this.subject}`);
    }
}

const person = new Person('Alice');
const student = new Student('Bob', 'Harvard');
const teacher = new Teacher('Charlie', 'Math');

person.introduce();  // Hi, my name is Alice
student.introduce();  // Hi, my name is Bob and I study at Harvard
teacher.introduce();  // Hi, my name is Charlie and I teach Math
```

**总结：**

多态允许通过统一的接口来调用不同子类的方法，不同的子类提供不同的实现。当我们调用相同的 `introduce()` 方法时，不同对象展现出了不同的行为。

------

**总结：**

- **封装**：通过类的构造函数和方法，封装对象的内部属性和行为，保护数据并提供清晰的接口。
- **继承**：子类继承父类的属性和方法，复用父类代码，并且可以扩展或修改父类的功能。
- **多态**：不同的子类可以有不同的方法实现，通过相同的接口调用不同的对象表现出不同的行为。



## js异步流程控制（很重要）

- **网络请求**
- **用户交互**
- **定时任务**
- **文件读取（Node.js）**
- **UI 渲染与性能优化**

------

🧠 一、什么是异步？为什么需要异步？

**JS 是单线程的语言**，一次只能做一件事。如果某个任务耗时很久（比如请求接口、读取大文件），会 **阻塞主线程**，导致页面卡死，按钮没反应，用户体验很差。

✅ 异步的好处：

- 不会阻塞主线程
- 可以提高用户体验
- 能同时处理多个任务（虽然是伪并行）

------

🔁 二、常见的异步控制方式对比

| 方法                 | 可读性           | 控制能力 | 是否常用 | 项目中场景              |
| -------------------- | ---------------- | -------- | -------- | ----------------------- |
| 回调函数（Callback） | 差               | 一般     | 有遗留   | 老项目、Node.js fs 操作 |
| Promise              | 较好             | 好       | 非常常用 | 网络请求、并发处理      |
| async/await          | 最好             | 非常好   | 主流方法 | 几乎所有异步处理        |
| 生成器 + 协程        | 理论强，但实战少 | 高       | 较少     | 某些框架/中间件         |

------

🧱 三、从回调到 async/await 的进化过程

🔹 1. 回调函数 Callback（初级，容易回调地狱）

```js
function getData(callback) {
  setTimeout(() => {
    callback("数据来了");
  }, 1000);
}

getData(function(data) {
  console.log(data); // 输出：数据来了
});
```

> **项目痛点**：嵌套层级多时，代码非常难维护。比如嵌套请求或用户流程：注册 → 登录 → 获取资料 → 渲染页面。

------

🔹 2. Promise（避免回调地狱）

```js
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("数据来了");
    }, 1000);
  });
}

getData()
  .then(data => {
    console.log(data);
    return "下一步";
  })
  .then(next => {
    console.log(next);
  })
  .catch(err => {
    console.error(err);
  });
```

📌 **项目中用法举例**：

```js
fetch('/api/user')
  .then(res => res.json())
  .then(data => {
    console.log("用户信息", data);
  })
  .catch(err => {
    console.error("请求失败", err);
  });
```

------

🔹 3. async/await（现代项目推荐）

```js
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("数据来了"), 1000);
  });
}

async function load() {
  const data = await getData();
  console.log(data);
}
load();
```

📌 **项目中真实用法（登录）**：

```js
async function login() {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ user: "admin", pass: "123" }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      console.log("登录成功");
    }
  } catch (error) {
    console.error("登录失败", error);
  }
}
```

------

🛠 四、实际项目中常见的异步控制技巧

✅ 1. 并发执行多个异步任务（Promise.all）

```js
const [userInfo, settings] = await Promise.all([
  fetch('/api/user').then(res => res.json()),
  fetch('/api/settings').then(res => res.json())
]);
```

- 用于**并发加载多个接口，提高效率**
- 如果任何一个失败，会直接进入 `catch`

------

✅ 2. 串行执行多个异步任务

```js
async function stepFlow() {
  const token = await getToken();
  const userInfo = await getUser(token);
  const dashboard = await loadDashboard(userInfo.id);
}
```

> 登录流程、支付流程等都需要**按顺序一步步来**

------

✅ 3. 超时控制 + 中止请求（AbortController）

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api/slow", { signal: controller.signal });
  const data = await res.json();
  console.log(data);
} catch (e) {
  console.error("请求超时或中止", e);
}
```

> 项目中用户切换页面或操作超时时非常实用

------

✅ 4. 自定义 sleep 等待

```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log("开始");
  await sleep(1000);
  console.log("1 秒后");
}
```

------

💬 五、常见面试题（建议掌握）

1. Promise 是同步还是异步？（**立即执行器同步执行，但 then/catch 异步**）
2. async 函数返回值是什么？（**总是返回 Promise**）
3. try-catch 捕不到哪里？（**Promise 未 await 的错误不会捕获**）
4. Promise.all 和 Promise.race 区别？
5. 如何中止 fetch 请求？

------

### promise

🧠 一、Promise 是什么？

> **Promise 是一个代表异步操作最终完成或失败的对象。**

它有三种状态：

| 状态        | 含义                   | 是否可变 |
| ----------- | ---------------------- | -------- |
| `pending`   | 进行中                 | ✔        |
| `fulfilled` | 已成功（用 `resolve`） | ❌        |
| `rejected`  | 已失败（用 `reject`）  | ❌        |

一旦进入 `fulfilled` 或 `rejected` 状态，就不能再更改。

------

🧱 二、Promise 的基本用法

✅ 1. 创建 Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("成功的值");
  } else {
    reject("失败的原因");
  }
});
```

✅ 2. 消费 Promise

```js
promise
  .then(data => {
    console.log("成功：", data);
  })
  .catch(err => {
    console.log("失败：", err);
  })
  .finally(() => {
    console.log("无论成功失败，都会执行");
  });
```

------

💼 三、实际开发中 Promise 的常用方法

✅ 1. `Promise.resolve()` 和 `Promise.reject()`

快速创建一个成功或失败的 Promise：

```js
Promise.resolve(100).then(v => console.log(v)); // 100
Promise.reject("出错了").catch(e => console.error(e)); // 出错了
```

------

✅ 2. `Promise.all()` 并发多个异步任务（**全部成功才成功**）

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(results => {
  console.log(results); // [1, 2, 3]
});
```

📌 **应用场景**：比如获取用户信息和权限

```js
async function loadUserData() {
  const [info, permissions] = await Promise.all([
    fetch("/api/info").then(res => res.json()),
    fetch("/api/permissions").then(res => res.json())
  ]);
}
```

------

✅ 3. `Promise.race()` （**只要有一个完成就返回**）

```js
const slow = new Promise(resolve => setTimeout(() => resolve("慢"), 3000));
const fast = new Promise(resolve => setTimeout(() => resolve("快"), 1000));

Promise.race([slow, fast]).then(res => {
  console.log(res); // "快"
});
```

📌 **应用场景**：请求超时控制

------

✅ 4. `Promise.allSettled()`（**等待全部完成，不管成败**）

```js
const p1 = Promise.resolve("成功");
const p2 = Promise.reject("失败");

Promise.allSettled([p1, p2]).then(results => {
  console.log(results);
  /*
    [
      { status: "fulfilled", value: "成功" },
      { status: "rejected", reason: "失败" }
    ]
  */
});
```

📌 **应用场景**：批量接口请求时，需要处理每个接口的结果状态

------

🧩 四、Promise 链式调用原理

```js
doSomething()
  .then(result => {
    return doNext(result);
  })
  .then(next => {
    console.log(next);
  })
  .catch(err => {
    console.error("统一错误处理", err);
  });
```

✅ **关键点**：

- `.then()` 返回的也是一个新的 Promise
- 每个 `then()` 都可以 return 一个值或新的 Promise
- `.catch()` 能捕获上方所有 Promise 抛出的错误

------

⚠️ 五、Promise 的常见坑

❌ 1. 忘记 return，链断了

```js
// 错误：没有 return，无法链式传值
doA().then(data => {
  doB(data); // ❌ 这里忘了 return
}).then(res => {
  console.log(res); // undefined
});
```

✅ 正确写法：

```js
doA().then(data => {
  return doB(data);
}).then(res => {
  console.log(res); // 正确结果
});
```

------

❌ 2. 捕获不到异步内部错误

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("错误"); // ❌ 不会被 catch 捕获
  }, 1000);
}).catch(err => {
  console.error("捕获不到", err);
});
```

✅ 正确写法：要用 `reject` 抛出

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("可捕获的错误"));
  }, 1000);
}).catch(err => {
  console.error("能捕获", err);
});
```

------

🧪 六、模拟项目中的实际例子

示例：页面加载时，拉取用户数据和通知列表，并在其中一个失败时不中断

```js
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/user").then(res => res.json()),
    fetch("/api/notifications").then(res => res.json())
  ]);

  const [userRes, notifRes] = results;

  if (userRes.status === "fulfilled") {
    renderUser(userRes.value);
  } else {
    showError("用户信息获取失败");
  }

  if (notifRes.status === "fulfilled") {
    renderNotifications(notifRes.value);
  }
}
```

------

🧠 七、面试高频问题总结（可复习）

| 问题                               | 解答关键点                           |
| ---------------------------------- | ------------------------------------ |
| Promise 有几种状态？               | `pending`, `fulfilled`, `rejected`   |
| then 的返回值是什么？              | 一个新的 Promise                     |
| 多个请求怎么并发控制？             | `Promise.all`                        |
| 如何处理多个请求中的失败？         | 用 `Promise.allSettled`              |
| 如何捕获链中的异常？               | 用 `.catch()`                        |
| 什么是回调地狱？Promise 如何解决？ | 回调层层嵌套，Promise 扁平化代码结构 |



**`Promise` 的静态方法**是 `Promise` 类本身提供的一些方法，用来处理 **异步操作** 或 **多个异步操作**。这些静态方法是 **直接调用 `Promise` 类的**，而不是通过实例化 `Promise` 对象来调用的。

常见的 `Promise` 静态方法

1. **`Promise.resolve()`**

`Promise.resolve()` 用于返回一个已解决（fulfilled）的 Promise 对象。如果传入的参数是一个 `thenable` 对象（即具有 `then()` 方法的对象），那么它会返回一个与该对象相同的 Promise；否则，它会返回一个已解决的 Promise。

用法：

```js
// 返回一个已解决的 Promise，值为 '成功'
const promise = Promise.resolve('成功');
promise.then(result => console.log(result));  // 输出：'成功'
```

另一个例子：

```js
// 传入一个普通值，返回一个 resolved Promise
const promise1 = Promise.resolve(100);
promise1.then(value => console.log(value));  // 输出：100

// 传入一个 thenable 对象（实现了 then 方法）
const thenable = {
  then: function(resolve, reject) {
    resolve('Hello from thenable!');
  }
};
const promise2 = Promise.resolve(thenable);
promise2.then(value => console.log(value));  // 输出：Hello from thenable!
```

2. **`Promise.reject()`**

`Promise.reject()` 用来返回一个已拒绝（rejected）的 Promise 对象，通常用于表示异步操作的失败。它的行为类似于直接创建一个失败的 Promise。

用法：

```js
// 返回一个已拒绝的 Promise，原因是 '出错了'
const promise = Promise.reject('出错了');
promise.catch(error => console.log(error));  // 输出：'出错了'
```

3. **`Promise.all()`**

`Promise.all()` 用于处理多个并发的 Promise 对象。它接受一个包含多个 Promise 的数组，并返回一个新的 Promise，这个新的 Promise 只有在所有的 Promise 都成功（fulfilled）时才会成功；如果有任何一个 Promise 被拒绝（rejected），`Promise.all()` 会立即返回一个失败的 Promise。

用法：

```js
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))  // 输出：[1, 2, 3]
  .catch(error => console.log(error));
```

处理失败：

```js
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('失败了');
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.log(error));  // 输出：失败了
```

4. **`Promise.allSettled()`**

`Promise.allSettled()` 接受一个包含多个 Promise 的数组，并返回一个新的 Promise，且无论这些 Promise 成功还是失败，最终都会执行。这意味着它总是会返回所有 Promise 的结果，无论它们是 fulfilled 还是 rejected。

用法：

```js
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('失败');
const promise3 = Promise.resolve(3);

Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results))
  /*
    输出：
    [
      { status: "fulfilled", value: 1 },
      { status: "rejected", reason: "失败" },
      { status: "fulfilled", value: 3 }
    ]
  */
```

5. **`Promise.race()`**

`Promise.race()` 用于处理多个并发的 Promise。当其中任何一个 Promise 完成（无论是成功还是失败）时，`race()` 返回的 Promise 就会立刻返回该 Promise 的结果。这是一个竞争的过程，只有最快完成的 Promise 会被采纳。

用法：

```js
const promise1 = new Promise((resolve) => setTimeout(resolve, 500, '第一个 Promise'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, '第二个 Promise'));

Promise.race([promise1, promise2])
  .then(result => console.log(result))  // 输出：第二个 Promise
  .catch(error => console.log(error));
```

6. **`Promise.any()`**

`Promise.any()` 接受一个包含多个 Promise 的数组，返回一个新的 Promise。这个新的 Promise 会在 **第一个成功的 Promise** 被解决时变为 **fulfilled**，如果所有 Promise 都被拒绝，`Promise.any()` 会返回一个拒绝状态的 Promise。

用法：

```js
const promise1 = Promise.reject('失败');
const promise2 = Promise.resolve('成功');
const promise3 = Promise.reject('失败');

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result))  // 输出：成功
  .catch(error => console.log(error));  // 如果所有 Promise 都失败，会进入这个 catch
```

7. **`Promise.resolve()` 与 `Promise.reject()` 的区别**

- **`Promise.resolve()`**：当你需要返回一个已成功的 Promise，可以用这个方法。可以传入值或 `thenable` 对象。
- **`Promise.reject()`**：当你需要返回一个已失败的 Promise，可以用这个方法，传入一个失败的原因。

------

8. **总结**

| 方法                       | 作用                                                    | 示例                                       |
| -------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| **`Promise.resolve()`**    | 返回一个已解决的 Promise 对象，通常用于返回成功的结果   | `Promise.resolve('成功')`                  |
| **`Promise.reject()`**     | 返回一个已拒绝的 Promise 对象，通常用于返回失败的原因   | `Promise.reject('失败')`                   |
| **`Promise.all()`**        | 处理多个并发的 Promise，只有所有 Promise 都成功才会成功 | `Promise.all([promise1, promise2])`        |
| **`Promise.allSettled()`** | 处理多个并发的 Promise，所有 Promise 完成后都返回结果   | `Promise.allSettled([promise1, promise2])` |
| **`Promise.race()`**       | 处理多个并发的 Promise，返回最先完成的 Promise 的结果   | `Promise.race([promise1, promise2])`       |
| **`Promise.any()`**        | 处理多个并发的 Promise，返回第一个成功的 Promise 的结果 | `Promise.any([promise1, promise2])`        |

9. **实际应用场景**

这些静态方法在项目中非常有用，尤其是在你需要处理多个异步任务时：

- **`Promise.all()`** 用于确保多个异步任务都成功完成，适合处理多个并发请求。
- **`Promise.race()`** 用于控制超时，哪个请求先返回就采用哪个。
- **`Promise.allSettled()`** 用于等待所有异步操作完成并处理结果，无论成功还是失败。
- **`Promise.any()`** 用于优先获取第一个成功的异步结果。



### 生成器和co

**生成器函数（Generator Functions）** 和 **`co`**（一个库）都是在 JavaScript 中用于简化异步编程的工具，但它们有不同的概念和应用。

一、**生成器函数（Generator Functions）**

生成器函数是 JavaScript 中的一种特殊类型的函数，它可以暂停执行，并在之后恢复执行。生成器函数是 ES6（ECMAScript 6）引入的，它通过 **`function\*`** 语法声明，并使用 **`yield`** 关键字来暂停和恢复函数的执行。

1. **基本语法**

- **`function\*`** 表示生成器函数。
- **`yield`** 用于暂停函数的执行，并返回一个值。
- 调用生成器函数时，返回的是一个 **生成器对象**，它可以用于控制生成器函数的执行。

2. **生成器函数的创建和执行**

```js
function* myGenerator() {
  console.log("开始");
  yield "A";  // 暂停并返回 "A"
  console.log("继续");
  yield "B";  // 暂停并返回 "B"
  console.log("结束");
  return "完成";
}

const gen = myGenerator();  // 创建生成器对象
console.log(gen.next());  // 执行生成器，输出：开始 { value: 'A', done: false }
console.log(gen.next());  // 继续执行生成器，输出：继续 { value: 'B', done: false }
console.log(gen.next());  // 继续执行生成器，输出：结束 { value: '完成', done: true }
```

- **`gen.next()`**：每次调用都会执行到下一个 `yield` 语句处，`next()` 返回一个对象 `{ value, done }`：
  - `value`：`yield` 返回的值；
  - `done`：如果生成器函数已经执行完毕，`done` 为 `true`；否则为 `false`。

3. **生成器函数的应用**

生成器函数非常适合于处理需要暂停的操作，特别是在 **异步操作** 中，例如：读取文件、请求网络资源等。

```js
function* fetchData() {
  const data1 = yield fetch('https://api.example.com/data1');
  const data2 = yield fetch('https://api.example.com/data2');
  console.log(data1, data2);
}

const gen = fetchData();
gen.next();  // 启动生成器函数
```

但是，**生成器函数** 本身并不能直接处理异步操作。我们需要额外的工具（例如 **`co`** 库）来帮助生成器处理 `Promise` 或异步操作。

------

二、**`co` 库**

`co` 是一个用于简化生成器函数与异步操作（`Promise`）配合使用的库。它可以自动将生成器函数中的 `yield` 语句与 `Promise` 结合起来，实现异步操作的顺序执行。`co` 使得生成器函数可以像 `async/await` 一样更加简洁地处理异步任务。

1. **安装 `co` 库**

你可以通过 npm 安装 `co` 库：

```bash
npm install co
```

2. **`co` 的使用**

`co` 库自动处理生成器函数中的 `yield`，它会把 `yield` 后面的 `Promise` 异步执行，然后继续执行生成器函数。

```js
const co = require('co');

function* fetchData() {
  const data1 = yield fetch('https://api.example.com/data1');
  const data2 = yield fetch('https://api.example.com/data2');
  console.log(data1, data2);
}

co(fetchData);  // co 自动处理生成器中的 Promise
```

- 在这个例子中，`co` 会自动处理 `yield` 后面的 `Promise`，实现顺序执行。
- `co(fetchData)` 会返回一个 **Promise**，可以使用 `.then()` 或 `await` 进行处理。

3. **使用 `co` 处理多个异步操作**

`co` 使得生成器函数非常适合用于处理多个异步请求，比如串行执行多个网络请求：

```js
const co = require('co');

function* fetchData() {
  const data1 = yield fetch('https://api.example.com/data1');
  const data2 = yield fetch('https://api.example.com/data2');
  return [data1, data2];
}

co(fetchData)
  .then(result => {
    console.log(result);  // 结果：[data1, data2]
  })
  .catch(error => {
    console.error(error);
  });
```

4. **`co` 的错误处理**

`co` 自动处理生成器中的异步错误。如果 `yield` 后面的 `Promise` 被拒绝，`co` 会抛出错误并进入 `catch` 块。

```js
const co = require('co');

function* fetchData() {
  const data1 = yield fetch('https://api.example.com/data1');
  const data2 = yield fetch('https://api.example.com/data2');
  if (!data1 || !data2) {
    throw new Error('数据获取失败');
  }
  return [data1, data2];
}

co(fetchData)
  .then(result => {
    console.log(result);  // 成功的结果
  })
  .catch(error => {
    console.error(error);  // 错误处理
  });
```

5. **`co` 也支持 Promise.all**

`co` 还支持使用 `Promise.all()` 来并发执行多个异步操作。在生成器函数中，你可以使用 `yield` 来暂停并发操作的执行：

```js
const co = require('co');

function* fetchData() {
  const results = yield [
    fetch('https://api.example.com/data1'),
    fetch('https://api.example.com/data2')
  ];
  return results;
}

co(fetchData)
  .then(results => {
    console.log(results);  // [data1, data2]
  })
  .catch(error => {
    console.error(error);
  });
```

- 在这个例子中，`Promise.all()` 被自动处理，两个请求会并行执行。

------

三、**总结：生成器函数与 `co`**

| 特性         | 生成器函数 (Generator Functions)       | `co` 库                                               |
| ------------ | -------------------------------------- | ----------------------------------------------------- |
| **作用**     | 通过 `yield` 暂停和恢复函数的执行      | 简化生成器函数与 `Promise` 结合使用，自动处理异步操作 |
| **语法**     | `function*` 和 `yield`                 | `co()` 用于自动执行生成器中的异步操作                 |
| **主要用途** | 处理异步流程，适用于需要暂停执行的场景 | 使生成器函数能够轻松与异步操作（`Promise`）结合       |
| **异步处理** | 不直接处理异步，需要手动封装 `Promise` | 自动处理 `yield` 后的 `Promise`，简化异步操作         |
| **错误处理** | 手动使用 `try/catch` 来处理错误        | `co` 自动捕获并处理生成器中的错误                     |

四、**现代替代方案：`async/await`**

虽然生成器函数和 `co` 库在处理异步操作时非常有用，但 **`async/await`** 已经成为了现代 JavaScript 中处理异步操作的标准语法。`async/await` 语法更加简洁，且原生支持 `Promise`。

- `async/await` 使得异步代码像同步代码一样易读，并且与 `Promise` 无缝集成。
- 现代 JavaScript 的异步编程几乎完全用 `async/await` 替代了生成器函数和 `co` 库。

------

五、**是否适合在项目中使用生成器和 `co`？**

`async/await` 已经成为标准，**生成器函数与 `co`** 虽然可以处理异步操作，但相对来说现在已经有些过时。除非你在维护一个旧的代码库，或者你有特别需要使用生成器的场景，否则推荐使用 `async/await` 来进行异步编程。

如果你有实际的使用场景或想深入讨论生成器函数与 `co` 的实际用法，随时告诉我！



### async/await

**`async/await`** 是 JavaScript 中用于处理异步操作的现代语法，它基于 `Promise`，但比传统的 `.then()` 和 `.catch()` 更简洁、易读。`async/await` 在 ES8（ECMAScript 2017）中引入，使得处理异步任务变得像写同步代码一样清晰。

1. **`async` 函数**

`async` 是用来声明异步函数的关键字。当你将一个函数声明为 `async` 时，这个函数的返回值会是一个 **`Promise`**。即使你在 `async` 函数中直接返回了一个值，JavaScript 会自动将其包装为一个已解决（resolved）的 Promise。

基本语法：

```js
async function myFunction() {
  // 函数体
}
```

- 一个 `async` 函数 **总是返回一个 Promise**。
- `async` 函数的 **返回值** 是通过 `resolve()` 解决的 Promise。

示例：

```js
async function fetchData() {
  return '数据加载成功';
}

fetchData().then(result => {
  console.log(result);  // 输出：'数据加载成功'
});
```

在上面的代码中，`fetchData()` 返回的不是直接的字符串，而是一个被 `Promise` 包装过的字符串。

------

2. **`await` 表达式**

`await` 关键字只能在 `async` 函数内部使用，它的作用是：**暂停函数的执行**，直到 `await` 后面的 **`Promise`** 完成。`await` 会返回 `Promise` 的解决值（`resolved value`），或者抛出异常（如果 `Promise` 被拒绝的话）。

- `await` 会等待 `Promise` 被 **解决**（fulfilled）或者 **拒绝**（rejected）。
- 当 `Promise` 解决后，`await` 会返回 `Promise` 的值。
- 如果 `Promise` 被拒绝，`await` 会抛出异常，可以通过 `try/catch` 来捕获。

基本语法：

```js
const result = await somePromise;
```

示例：

```js
async function fetchData() {
  const result = await fetch('https://api.example.com/data');
  const data = await result.json();
  console.log(data);
}

fetchData();
```

在这个例子中，`fetchData` 是一个 `async` 函数，它会等待 `fetch` 请求完成，然后再继续执行后续的代码。`await fetch()` 会等待 `fetch` 请求返回，然后返回结果（即 `Response` 对象）。

------

3. **`async/await` 错误处理**

`async/await` 可以使用传统的 `try/catch` 来捕获异步操作的错误，这样使得异常处理更加简洁。

示例：

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('请求失败');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('错误:', error);
  }
}

fetchData();
```

- `try/catch` 语法块让你能够捕获到任何在 `await` 中发生的错误，包括网络请求失败、JSON 解析失败等。
- 在上面的例子中，若请求失败或者解析 `response.json()` 时发生错误，`catch` 语句会捕获到这个错误。

------

4. **多个 `await` 和并行执行**

当你有多个异步操作，并且它们不相互依赖时，**不必等到上一个操作完成才开始下一个操作**。如果每个 `await` 都会等待上一个操作完成，那么它们会串行执行，效率较低。

你可以使用 **`Promise.all()`** 来实现并行执行，从而提高效率。

示例（串行执行）：

```js
async function fetchData() {
  const result1 = await fetch('https://api.example.com/data1');
  const data1 = await result1.json();

  const result2 = await fetch('https://api.example.com/data2');
  const data2 = await result2.json();

  console.log(data1, data2);
}

fetchData();
```

在上面的代码中，`data1` 会在 `data2` 请求之前获取到，导致两个请求必须串行执行。这个做法效率较低。

示例（并行执行）：

```js
async function fetchData() {
  const [result1, result2] = await Promise.all([
    fetch('https://api.example.com/data1'),
    fetch('https://api.example.com/data2')
  ]);

  const data1 = await result1.json();
  const data2 = await result2.json();

  console.log(data1, data2);
}

fetchData();
```

- 在这里，`Promise.all()` 会使得两个 `fetch()` 请求并行执行，而不是等待一个请求完成后再开始下一个请求。这样可以提高代码的执行效率。

------

5. **`async/await` 与 `Promise` 的关系**

- **`async/await` 是基于 `Promise` 的语法糖**，它让处理异步操作的代码更简洁、更像同步代码。
- `async` 函数总是返回一个 `Promise`，而 `await` 会等待 `Promise` 完成，返回它的结果。
- 你可以将 `await` 用在任何返回 `Promise` 的地方，甚至是 `Promise` 的构造函数。

示例（`async/await` 和 `Promise` 结合）：

```js
async function fetchData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("数据加载成功"), 1000);
  });

  const result = await promise;  // 等待 Promise 被解决
  console.log(result);  // 输出：数据加载成功
}

fetchData();
```

------

6. **`async/await` 在异步任务中的应用**

`async/await` 特别适合处理 **复杂的异步任务流程**，尤其是有多个顺序依赖的异步操作，像是：

- **API 请求**：依次进行多个请求，或者并行进行多个请求。
- **文件操作**：读取文件、写入文件、删除文件等。
- **数据库查询**：执行多个数据库操作，确保按顺序完成。

------

7. **总结**

| 特性               | `async`                                     | `await`                                     |
| ------------------ | ------------------------------------------- | ------------------------------------------- |
| **声明位置**       | 用于声明函数，使函数成为异步函数            | 用于暂停 `async` 函数的执行，等待 `Promise` |
| **返回值**         | `async` 函数总是返回一个 `Promise`          | 返回 `Promise` 的解决值                     |
| **常见用法**       | 通过 `async` 声明异步函数                   | 通过 `await` 等待 `Promise` 的结果          |
| **错误处理**       | `async` 函数的错误可以通过 `try/catch` 捕获 | `await` 后的错误可以通过 `try/catch` 捕获   |
| **并行与串行执行** | 单个异步任务时使用                          | 适用于需要等待的单一异步操作                |
| **提高效率**       | 可与 `Promise.all()` 等结合，做并行任务     | 通过 `Promise.all()` 来做并行操作           |

------

8. **实际项目中的应用**

你可以在实际项目中使用 `async/await` 来处理以下场景：

- **串行的异步任务**：例如，先登录然后获取用户数据。
- **并行的异步任务**：例如，获取多个独立的数据并在最后处理。
- **复杂的异步逻辑**：多个依赖关系的异步操作可以通过 `await` 顺序执行。

------

**总结**：

- **`async/await`** 是基于 `Promise` 的语法糖，它使异步操作的写法更加简洁和易读。
- **`async`** 声明异步函数，**`await`** 用于等待异步操作结果，简化了原本复杂的异步流程。



使用 `async/await` 在页面加载时请求数据并渲染用户信息：

------

🎯 场景目标：

- 使用 `fetch` 异步请求 GitHub 用户信息（比如你的 `lxy123hh`）
- 使用 `async/await` 获取数据
- 成功后渲染头像、用户名、简介
- 请求失败时显示错误信息

------

✅ 完整代码（HTML + Vue 3 + Composition API + async/await）

```vue
<template>
  <div class="container">
    <h2>GitHub 用户信息</h2>

    <div v-if="loading">🔄 加载中...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <img :src="user.avatar_url" alt="头像" width="100" />
      <p><strong>用户名：</strong>{{ user.login }}</p>
      <p><strong>简介：</strong>{{ user.bio || '暂无简介' }}</p>
      <p><strong>主页链接：</strong><a :href="user.html_url" target="_blank">{{ user.html_url }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 1. 定义响应式变量
const user = ref({})
const loading = ref(true)
const error = ref(null)

// 2. 使用 async/await 获取数据
async function fetchUser() {
  try {
    const response = await fetch('https://api.github.com/users/lxy123hh')
    if (!response.ok) throw new Error('请求失败')
    const data = await response.json()
    user.value = data
  } catch (err) {
    error.value = '❌ 加载失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 3. 页面加载完成后自动调用
onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding: 20px;
}
img {
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
```

------

🧠 涉及知识点回顾：

| 用法                         | 说明                                       |
| ---------------------------- | ------------------------------------------ |
| `async function fetchUser()` | 用于声明一个异步函数                       |
| `await fetch(...)`           | 暂停等待 Promise 解析                      |
| `try/catch/finally`          | 用于错误捕获和结束处理                     |
| `ref()`                      | 定义响应式数据                             |
| `onMounted()`                | Vue 生命周期钩子：组件挂载时自动执行 fetch |
| 条件渲染 `v-if` `v-else`     | 显示加载、错误或数据内容                   |

------









## 事件循环

**事件循环**（Event Loop）是 JavaScript 在浏览器和 Node.js 中处理异步任务的机制。它的作用是让 JavaScript 在单线程的情况下，能够高效地处理并发操作。简而言之，事件循环的目的是处理异步操作（如用户输入、网络请求、定时器等）并确保它们能够按照一定的顺序执行。

1. **JavaScript 的单线程模型**

JavaScript 是单线程的，意味着它每次只能做一件事。尽管如此，我们仍然能够进行多个异步操作（例如定时器、文件读取、HTTP 请求等），这背后就是事件循环的工作机制。

2. **事件循环的工作原理**

事件循环的工作原理主要是通过 **任务队列**（task queue）和 **调用栈**（call stack）来管理异步任务和同步任务。以下是它的基本步骤：

主要组成部分：

1. **调用栈（Call Stack）**：
   - JavaScript 代码的执行顺序是通过调用栈管理的。每当执行一个函数时，它就会被推入调用栈，当函数执行完毕后，它会从栈中弹出。
   - 调用栈只会执行同步任务。
2. **任务队列（Task Queue）**：
   - 任务队列中存放的是异步任务（如 `setTimeout`、I/O 操作、网络请求等）。当调用栈为空时，事件循环会将队列中的任务逐一取出并执行。
   - 任务队列中有两种类型的任务：
     - **宏任务（Macrotasks）**：例如 `setTimeout`、`setInterval`、I/O 操作、UI 渲染等。
     - **微任务（Microtasks）**：例如 `Promise` 的回调函数（`.then()`、`.catch()`）和 `MutationObserver` 等。
3. **事件循环（Event Loop）**：
   - 事件循环会持续运行，不断地从任务队列中取出任务并执行。它的主要工作是检查调用栈是否为空，如果为空，就从任务队列中取出任务并执行。

事件循环的执行流程：

1. 执行调用栈中的同步代码。
2. 执行微任务队列中的任务（所有微任务会在宏任务执行之前被执行）。
3. 执行一个宏任务队列中的任务（例如定时器回调）。
4. 重复步骤 1、2 和 3，直到所有任务执行完毕。

3. **宏任务和微任务**

JavaScript 的任务队列分为两种类型的任务：宏任务（macrotask）和微任务（microtask）。

宏任务（Macrotasks）：

宏任务队列中的任务通常是较大的任务，它们通常是异步任务，执行完成之后会向调用栈添加新的函数。常见的宏任务有：

- `setTimeout`
- `setInterval`
- 网络请求（如 `XMLHttpRequest`、`fetch`）
- DOM 操作（渲染）

微任务（Microtasks）：

微任务是在宏任务之前执行的任务，它们通常比宏任务更加紧急。微任务的队列比宏任务的队列优先级更高，所以它们会先执行。常见的微任务有：

- `Promise` 的 `.then()`、`.catch()`、`.finally()` 回调
- `MutationObserver`
- `process.nextTick()`（Node.js 中）

执行顺序：

1. 事件循环首先从调用栈中执行所有同步代码。
2. 然后，事件循环会执行所有微任务（微任务队列是先于宏任务执行的）。
3. 执行完微任务后，事件循环会从宏任务队列中取出并执行一个宏任务。
4. 重复以上步骤，直到所有任务执行完成。

4. **事件循环示例**

以下是一个简单的示例，演示了宏任务和微任务的执行顺序：

```js
console.log('同步任务 1');  // 同步任务

setTimeout(() => {
  console.log('宏任务 1');  // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('微任务 1');  // 微任务
});

console.log('同步任务 2');  // 同步任务
```

执行顺序：

1. 执行 `console.log('同步任务 1')`（同步任务）。
2. 执行 `console.log('同步任务 2')`（同步任务）。
3. 由于 `setTimeout` 是宏任务，它会被加入到宏任务队列。
4. `Promise.resolve().then()` 是微任务，它会被加入到微任务队列。
5. 事件循环会先执行微任务队列中的任务，输出 `微任务 1`。
6. 最后，事件循环会从宏任务队列中取出并执行一个宏任务，输出 `宏任务 1`。

输出顺序：

```text
同步任务 1
同步任务 2
微任务 1
宏任务 1
```

5. **更多的事件循环示例**

微任务和宏任务的优先级：

```js
console.log('同步任务 1');  // 同步任务

setTimeout(() => {
  console.log('宏任务 1');  // 宏任务 1
}, 0);

Promise.resolve().then(() => {
  console.log('微任务 1');  // 微任务 1
  Promise.resolve().then(() => {
    console.log('微任务 2');  // 微任务 2
  });
});

console.log('同步任务 2');  // 同步任务
```

执行顺序：

1. 执行同步代码：`同步任务 1` 和 `同步任务 2`。
2. 微任务 `微任务 1` 执行（此时 `微任务 1` 会创建一个新的微任务 `微任务 2`）。
3. `微任务 2` 执行。
4. 宏任务执行：`宏任务 1`。

输出：

```text
同步任务 1
同步任务 2
微任务 1
微任务 2
宏任务 1
```

6. **总结**

1. **单线程**：JavaScript 运行在一个单线程环境中，事件循环是为了在单线程上实现异步操作的调度。
2. **调用栈**：同步代码执行时，调用栈中的任务会按照顺序执行。
3. **任务队列**：异步任务（如 `setTimeout`、`Promise` 等）会被加入到任务队列中，并等待执行。
4. **事件循环**：事件循环会在调用栈空闲时，按照优先级顺序从任务队列中取出任务并执行。微任务优先于宏任务执行。
5. **宏任务和微任务**：
   - **宏任务**（如 `setTimeout`、I/O 操作）会在每轮事件循环中执行。
   - **微任务**（如 `Promise` 回调）会在宏任务之前执行。

7. **实际应用**

事件循环是 JavaScript 异步编程的核心，理解它能够帮助你更好地掌握：

- **异步代码的执行顺序**。
- **如何优化性能**，例如避免过多的微任务堆积。





## ESM

**ESM** 是 **ECMAScript Modules** 的缩写，是 JavaScript 中的一种模块化机制。模块化是现代 JavaScript 开发中的一个重要概念，它允许你将代码拆分成多个独立的文件（模块），然后通过导入和导出（`import` 和 `export`）来组织代码，从而实现更好的代码管理、重用和依赖管理。

**背景：**

在 JavaScript 早期，模块化是通过使用 **CommonJS**（Node.js）和 **AMD**（Asynchronous Module Definition）等方案来实现的。然而，ES6（ECMAScript 2015）引入了 **原生的模块化系统**，即 **ESM（ECMAScript Modules）**。ESM 允许开发者使用标准化的语法来实现模块化，避免了之前的模块化方案的各种不一致性和兼容性问题。

**1. ESM 的基本语法：**

**`export` 和 `import`** 是 ESM 模块化的两个核心关键字。

**1.1 导出（Export）**

ESM 允许你将代码中的某个变量、函数、对象等导出，使其可以被其他模块导入并使用。

1. **命名导出（Named Export）**

命名导出允许你导出多个变量、函数等，并且在导入时可以根据名字来引用。

```js
// utils.js
export const pi = 3.14159;
export function square(x) {
  return x * x;
}
export function cube(x) {
  return x * x * x;
}
```

1. **默认导出（Default Export）**

每个模块只能有一个默认导出。默认导出通常用来导出一个主要的功能、对象或类。

```js
// math.js
export default function add(a, b) {
  return a + b;
}
```

1. **混合导出（Named + Default）**

你可以同时使用命名导出和默认导出。

```js
// utils.js
export const pi = 3.14159;
export default function multiply(x, y) {
  return x * y;
}
```

**1.2 导入（Import）**

导入是指在另一个模块中使用某个模块的导出内容。



| 特点                     | **命名导入**                                             | **默认导入**                                                 |
| ------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| **导出方式**             | 允许导出多个内容，必须通过 **`export`** 指定每个项的名字 | 每个模块只能有一个 **`export default`**，通常用于导出模块的主要功能 |
| **导入方式**             | 导入时需要使用与导出时相同的名称                         | 导入时可以自定义名称，导入的名称不必与导出的名称相同         |
| **灵活性**               | 可以选择导入部分内容                                     | 只能导入一个默认导出的内容                                   |
| **语法**                 | `import { name1, name2 } from 'module';`                 | `import anyName from 'module';`                              |
| **适用场景**             | 导出多个功能，或者只想导入其中一个或多个功能             | 导出模块的核心功能或对象，通常用于单个主要功能               |
| **导入多个内容时的语法** | 可以在一个 `import` 语句中导入多个命名导出               | 只导入一个默认导出                                           |

| **命名导入**               | **默认导入**                             |
| -------------------------- | ---------------------------------------- |
| 适合导入多个导出的内容     | 适合导入模块的主功能（只有一个默认导出） |
| 必须导入时使用相同名称     | 可以使用任意名称导入默认导出的内容       |
| 使用 `{}` 包裹多个导入项   | 直接使用 `import anyName from 'module'`  |
| 适合功能拆分，模块化较强   | 适合单一功能，模块较为简单               |
| 可以选择导入模块的部分内容 | 只能导入模块的默认导出                   |

1. **命名导入（Named Import）**

你可以从一个模块中导入一个或多个命名导出的内容。导入时使用与导出时相同的名称。

```js
// app.js
import { pi, square } from './utils.js';

console.log(pi);         // 3.14159
console.log(square(5));  // 25
```

1. **默认导入（Default Import）**

如果模块使用了默认导出，你可以用任意名字导入它。

```js
// app.js
import add from './math.js';

console.log(add(2, 3));  // 5
```

1. **命名导入和默认导入一起使用**

你可以在同一个导入语句中同时导入命名导出和默认导出。

```js
// app.js
import add, { pi, square } from './utils.js';

console.log(add(2, 3));  // 默认导入的函数
console.log(pi);         // 命名导入的常量
console.log(square(4));  // 命名导入的函数
```

1. **导入所有内容（`\*` 作为通配符）**

你可以使用 `*` 来导入整个模块的所有命名导出，并将它们绑定到一个对象。

```js
// app.js
import * as utils from './utils.js';

console.log(utils.pi);        // 3.14159
console.log(utils.square(4)); // 16
```

**1.3 导入和导出的注意点**

- **`export`** 在模块中用于导出内容。
- **`import`** 用于从其他模块中导入内容。
- ESM 模块默认是 **异步加载** 的，因此可以有效支持 **代码分割**。
- **导入语句必须放在文件的顶部**，它们必须在其他代码执行之前加载。
- **`export default`** 和 **`export`** 可以同时使用，但默认导出只能有一个。

**2. ESM 的特点**

1. **静态分析**：ESM 是静态的，意味着所有的 `import` 和 `export` 都必须在编译时就能确定。这使得 JavaScript 引擎能够更好地优化代码（例如代码分割、死代码删除）。
2. **异步加载**：ESM 模块会被异步加载，这与传统的 `script` 标签加载的同步方式不同。浏览器会并行加载所有模块并执行它们。
3. **顶级作用域**：ESM 模块的变量、函数等都是在模块的作用域内独立的，不会影响全局作用域。这样避免了不同模块间的命名冲突。

**3. ESM 模块的优势：**

- **可维护性**：模块化使得代码更易于管理、维护和复用。
- **性能优化**：ESM 的静态结构使得 JavaScript 引擎可以做更好的优化，提升性能。
- **依赖管理**：模块化使得不同模块之间的依赖关系变得清晰，避免了全局变量污染的问题。
- **浏览器和 Node.js 都支持**：ESM 是标准的 JavaScript 模块格式，浏览器和 Node.js 都支持它。

**4. ESM 在 Node.js 中的支持**



在浏览器中，ESM 可以通过 `<script type="module">` 标签来加载模块。每个模块文件都是一个独立的作用域，无法直接访问全局变量。

```html
<!-- index.html -->
<script type="module">
  import { pi, square } from './utils.js';
  console.log(pi); // 3.14159
  console.log(square(4)); // 16
</script>
```

在 Node.js 中，原生的 **CommonJS** 模块系统（使用 `require()` 和 `module.exports`）被广泛使用，但从 **Node.js 12+** 开始，Node.js 已经开始支持 **ESM** 模块系统。

如何在 Node.js 中使用 ESM：

1. **使用 `.mjs` 扩展名**：
    Node.js 支持使用 `.mjs` 扩展名的文件作为 ESM 模块。例如，`utils.mjs`。

```js
// app.mjs
import { pi } from './utils.mjs';
console.log(pi);
```

1. **在 `package.json` 中指定类型**：
    如果你希望在项目中直接使用 `.js` 扩展名作为 ESM 模块，可以在 `package.json` 中设置 `"type": "module"`，这样所有 `.js` 文件都会被当做 ESM 模块处理。

   ```json
   {
     "type": "module"
   }
   ```

2. **导入外部模块（例如 CommonJS 模块）**：
    当你想在 ESM 中导入一个 CommonJS 模块时，你需要使用 `import`，但是 `require` 语法会因为它是同步的而不适用于异步加载。

```js
// 导入 CommonJS 模块
import fs from 'fs';
```

**5. 兼容性问题和解决方案**

ESM 在浏览器和 Node.js 中的支持已经非常成熟，但在一些环境中仍然可能遇到兼容性问题：

- **浏览器兼容性**：大部分现代浏览器都已经支持 ESM，但对于旧版浏览器，可能需要使用 **`Babel`** 或 **`Webpack`** 进行转译。
- **Node.js 版本**：Node.js 12+ 支持 ESM，但可能会遇到与 CommonJS 的兼容问题。为了解决这个问题，Node.js 引入了 `.mjs` 文件扩展名，并且支持在 `package.json` 中设置 `"type": "module"`。

**总结**

- **ESM（ECMAScript Modules）** 是 JavaScript 的模块化标准，使用 `import` 和 `export` 来导入和导出模块内容。
- ESM 使得代码更加模块化，能够帮助提高代码的可维护性和性能。
- **Node.js** 从 12 版本开始原生支持 ESM，但仍有一些兼容性问题，尤其是与 **CommonJS** 的混用问题。





## babel

在基于 **Vite** 创建的 **Vue 3** 项目中，**Babel** 依然发挥着重要的作用，尽管 Vite 本身使用了 **esbuild** 来进行快速的 JavaScript 转译和构建，但 **Babel** 主要有以下几个用途：

**1. 使用现代 JavaScript 语法特性**

Vite 默认使用 **esbuild** 进行开发时的快速构建和转译，**esbuild** 速度非常快，适合开发阶段的即时构建。然而，**Babel** 依然可以在生产构建过程中发挥作用，特别是当你使用一些 **高级 JavaScript 特性** 时，Babel 可以进一步优化这些特性。

例如，你可以在项目中使用 **`async/await`**、**类（class）**、**模块化（module）** 等现代 JavaScript 特性，而 Babel 可以将这些特性转译为兼容旧版浏览器（如 IE11）或更旧版本 JavaScript 引擎的代码。

**2. 处理特定语法（如 JSX 或 TypeScript）**

如果你使用 **React** 或 **Vue**，你的代码中可能包含 **JSX** 语法（React）或者 **Vue 单文件组件**（`.vue` 文件）中的 JavaScript。为了正确地转换这些语法，Vite 通过 Babel 插件来实现：

- **JSX 转换**：如果你使用 React，Babel 会帮助将 **JSX** 语法转译为普通的 JavaScript。
- **Vue 文件支持**：如果你使用 Vue，Babel 会处理 Vue 文件中的 JavaScript 部分，确保它能正确运行。

**3. 兼容性和 Polyfill**

尽管 **esbuild** 提供了快速的构建速度，但它没有像 **Babel** 那样的 **Polyfill** 支持。**Babel** 可以根据目标环境的需求，自动添加缺失的 **Polyfill**（例如：`Promise`、`Array.prototype.includes` 等），这对于兼容一些不支持新特性的浏览器非常重要。

你可以通过配置 Babel 的 **`@babel/preset-env`** 来指定目标浏览器或环境，Babel 会自动添加必要的 Polyfill 代码。

**4. Babel 与 Vite 的配合**

Vite 默认使用 **esbuild** 进行快速构建，但它并不完全取代 **Babel**，你可以在以下情况下使用 Babel 配置：

1. **对于特定环境的兼容性需求**：如果你需要将现代 JavaScript 转译成兼容旧版本浏览器的代码，或者需要兼容某些特定的语法，Babel 会更为灵活。
2. **处理复杂的语法或框架特性**：例如，使用 **JSX**、**TypeScript** 或某些高级语法时，Babel 更适合处理这些任务。
3. **优化代码**：Babel 支持一些插件（如 `babel-plugin-transform-runtime`），可以帮助你优化 JavaScript 代码的性能，并避免代码重复。

**5. 使用 Babel 的常见场景**

**1. 使用 `async/await` 和类（class）**

假设你编写的代码使用了现代 JavaScript 特性，如 `async/await`，如果你希望代码在所有浏览器中兼容，你需要使用 Babel 进行转译。

例如：

```js
const fetchData = async () => {
  const response = await fetch('/api');
  return response.json();
};
```

Babel 会将其转译为：

```js
var fetchData = function() {
  return fetch('/api').then(function(response) {
    return response.json();
  });
};
```

**2. 使用 React 或 Vue 中的 JSX 语法**

```jsx
const element = <div>Hello, world!</div>;
```

Babel 会将其转译为：

```js
var element = React.createElement("div", null, "Hello, world!");
```

**3. 使用 TypeScript**

如果你使用 TypeScript，Babel 可以帮助你处理 TypeScript 转译，使其能够在 JavaScript 环境中运行。尽管 Vite 已经内置了对 TypeScript 的支持，但如果你需要更灵活的转换，Babel 仍然是一个有效的选择。

**6. 配置 Babel（如果需要）**

虽然 Vite 已经有自己的构建流程和优化，但是你仍然可以通过 Babel 配置来满足特定的需求。你可以通过创建 **`babel.config.js`** 或 **`.babelrc`** 配置文件，来指定你需要的 Babel 插件和预设。

**`babel.config.js` 示例**：

```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead", // 适配目标环境
        useBuiltIns: "entry",        // 自动添加 Polyfill
        corejs: 3,                   // 使用 core-js 版本 3
      },
    ],
    "@babel/preset-react"          // 如果使用 React
  ],
  plugins: [
    "@babel/plugin-transform-runtime" // 优化代码，减少代码重复
  ]
};
```

**7. 总结**

- **Babel** 仍然在现代前端开发中扮演着重要角色，尤其是在你使用 **Vue 3**、**React** 或其他现代框架时。
- **Vite** 和 **esbuild** 提供了快速的构建和开发体验，但 **Babel** 仍然用于一些 **高级转译** 和 **兼容性处理**，例如 **Polyfill**、**JSX 转译**、以及为旧浏览器转译现代 JavaScript 语法。
- 即使你使用 Vite，**Babel** 也可以根据需要为你的项目提供额外的支持，确保兼容性，支持最新的 JavaScript 特性，并优化代码。

因此，虽然 Vite 提供了高效的构建流程，但 **Babel** 仍然是现代前端开发中不可忽视的重要工具，特别是在处理兼容性和高级语法时。

如果你需要更多关于如何在项目中配置 Babel 的帮助，或者有其他问题，随时告诉我！

是的，通常情况下，在使用 **Vite** 创建 Vue 3 项目时，**Babel** 的配置大多数情况下已经被 **Vite** 自动处理好了。你不需要手动去配置 Babel，因为 **Vite** 本身会处理大部分的转译工作，尤其是 **ES6+** 语法的转译，它使用了 **esbuild**，一个更快速的 JavaScript 编译器，来处理大部分的转换工作。

**为什么一般不需要手动配置 Babel**

1. **Vite 默认使用 esbuild**

- **Vite** 使用 **esbuild** 来处理 JavaScript 代码的转译，**esbuild** 本身非常快速，并且已经内置支持 **ES6+** 语法的转译（如箭头函数、类、模板字面量、`async/await` 等），因此，通常你不需要 Babel 来处理这些常见的转译任务。
- **esbuild** 本身已经可以做到很高效的代码转换，甚至比 Babel 更快，所以如果你只是需要进行常规的现代 JavaScript 转译，Vite 的默认配置已经足够了。

2. **Vite 自动处理 Vue 文件**

- 如果你使用 **Vue**，Vite 会自动通过插件处理 `.vue` 文件，转换其中的 JavaScript 部分，无需手动配置 Babel 来处理 Vue 文件中的 JavaScript。

3. **Babel 的作用**

- 在现代前端开发中，Babel 的主要用途是让你能够使用最新的 JavaScript 特性，并确保兼容较旧的浏览器。如果你使用的是 **现代浏览器** 或 **Node.js 环境**，并且没有使用一些特殊的功能（如 **JSX** 或 **TypeScript**），你实际上并不需要 Babel 配置。
- 如果你需要在某些特殊的环境中进行转译（例如支持旧浏览器，或者使用 TypeScript 或 JSX），这时你才需要配置 Babel。

4. **自动 Polyfill 支持**

- 如果你需要 **Polyfill** 来支持缺失的功能（例如 `Promise`、`Array.prototype.includes`），Vite 会为你自动引入 Polyfill，而不需要你手动配置 Babel 来做这件事情。

**什么时候需要手动配置 Babel？**

虽然 Vite 默认已经处理了很多工作，但你可能在以下情况下需要手动配置 Babel：

1. **需要使用特殊的 JavaScript 特性或插件**：
   - 如果你使用一些 **JSX**（如 React）或 **TypeScript**，你可能需要手动配置 Babel，以确保它能够正确转译这些语法。
2. **特殊的浏览器兼容性需求**：
   - 如果你需要确保代码兼容一些非常老旧的浏览器（如 IE11），Babel 可以通过 `preset-env` 插件来自动处理代码转译和添加 Polyfill。
3. **自定义 Babel 插件**：
   - 如果你有特殊的转译需求，比如使用某些插件来优化代码，或者支持新的 JavaScript 特性，Babel 提供了灵活的插件系统，可以根据需要进行配置。

**总结：**

- 对于 **Vue 3 + Vite** 项目，大部分情况下，你并不需要手动配置 Babel，因为 **Vite** 已经自动处理了现代 JavaScript 特性的转译。
- 如果你不使用 **React JSX** 或 **TypeScript**，并且目标环境支持现代 JavaScript，那么 Babel 的配置通常是 **不必要的**。
- 如果需要兼容旧浏览器或者你需要使用 **Polyfill**，这时可以考虑手动配置 Babel，或者依赖 Vite 的内建功能来引入 Polyfill。

如果你的项目不涉及 **React**、**TypeScript** 等特殊需求，基本上你可以依赖 Vite 自带的构建工具，而不需要额外配置 Babel。

希望这能帮你理清是否需要配置 Babel，或者你可以通过其他方法来优化构建流程！如果有其他问题，随时告诉我！



## corejs

**什么是 Core-js？**

**Core-js** 是一个 JavaScript 的 **Polyfill** 库，它为 JavaScript 提供了 **最新的 ECMAScript 特性** 和 **Web API** 的实现，包括 **Promise**、**Map**、**Array.prototype.includes** 等新特性，这些特性可能在较旧的浏览器中不被支持。

Polyfill 的意思是：**为旧环境添加缺失的功能**，确保你编写的现代 JavaScript 代码能够在旧版浏览器或 JavaScript 引擎中运行。通过使用 **Core-js**，你可以不必担心现代 JavaScript 特性在旧环境中的支持问题，Core-js 会自动帮你填充这些缺失的功能。

**Core-js 的作用**

Core-js 通过向旧浏览器和环境提供 **ECMAScript** 和 **Web API** 的实现，来填补它们不支持的一些标准功能。它让你可以使用 **最新的 JavaScript 特性**，而不必担心目标环境的兼容性问题。

例如：

- **ES6+ 特性**：`Promise`、`Array.prototype.find`、`Map` 等特性。
- **其他标准 Web API**：如 `fetch`、`Object.assign` 等。

**Core-js 的常见功能**

1. **ES6+ Polyfill**：
   - **Promise**：用来支持异步编程。
   - **Map / Set**：用于存储键值对、无重复项的集合。
   - **Array methods**：如 `Array.prototype.includes`、`Array.prototype.find`、`Array.prototype.from` 等方法。
   - **Object methods**：如 `Object.assign`、`Object.values` 等方法。
2. **ES7 及更高版本的特性**：
   - **Async/Await**：异步编程的新方式，Babel 和 Core-js 可以用来支持 `async/await` 语法。
   - **Shared memory & Atomics**：提供共享内存和原子操作支持。
3. **Web API Polyfill**：
   - **fetch**：提供用于获取资源的 `fetch` API，代替传统的 `XMLHttpRequest`。
   - **URL**：提供 URL 构造器和解析支持。
   - **IntersectionObserver**：用于观察元素与视口的交集，常用于懒加载。
4. **全球范围的功能支持**：
   - Core-js 提供了 JavaScript 引擎的全局 Polyfill，帮助你在不支持特性的环境中使用它们。

**如何在项目中使用 Core-js？**

1. **安装 Core-js**

   你可以通过 npm 或 pnpm 安装 Core-js：

   ```bash
   pnpm add core-js
   ```

2. **在 Babel 配置中使用 Core-js**

   在现代 JavaScript 开发中，通常使用 Babel 进行代码转译，并且 Babel 通过 `@babel/preset-env` 预设来处理 Polyfill 的引入。你可以通过配置 `useBuiltIns` 和 `corejs` 选项来指定 Core-js。

   **Babel 配置示例**：

   你可以在 **`babel.config.js`** 或 **`.babelrc`** 中进行如下配置：

   ```javascript
   module.exports = {
     presets: [
       [
         "@babel/preset-env",  // 自动根据目标环境转译代码
         {
           targets: "> 0.25%, not dead",  // 选择支持的浏览器
           useBuiltIns: "entry",  // 使用 Core-js 来填充缺失的功能
           corejs: 3,  // 使用 Core-js 版本 3
         }
       ]
     ]
   }
   ```

   **配置说明**：

   - **`useBuiltIns: "entry"`**：表示 Babel 会检查你的代码并根据需要自动引入 Polyfill。`entry` 表示你需要在入口文件（通常是 `index.js` 或 `main.js`）手动引入 `core-js`。
   - **`corejs: 3`**：指定你要使用 **Core-js 版本 3**。

3. **引入 Core-js**：

   当你选择 **`useBuiltIns: "entry"`** 时，Babel 会根据你在代码中使用的特性，自动引入所需的 Core-js Polyfill。例如，在你的项目入口文件中添加以下代码：

   ```javascript
   import "core-js/stable"; // 引入所有的 Polyfill
   import "regenerator-runtime/runtime";  // 如果你使用了 async/await，可能需要这个 Polyfill
   ```

   **`core-js/stable`** 会加载 **Core-js 3.x** 的所有 Polyfill。你可以选择性地引入你需要的部分，以减小最终的文件大小：

   ```javascript
   import "core-js/features/array/find"; // 只引入特定功能的 Polyfill
   ```

4. **Polyfill 的引入方式**：

   - **`entry`**：手动在入口文件中引入 Core-js，Babel 会根据你的代码自动选择需要引入的 Polyfill。
   - **`usage`**：Babel 会自动根据代码中使用的特性来引入 Polyfill，无需在入口文件中显式引入。需要安装 `core-js` 和 `@babel/plugin-transform-runtime` 插件。

**Core-js 版本**

Core-js 当前有几个版本，主要有 **Core-js 3**，是现代项目中使用的版本。它的特点是：

- 支持最新的 ECMAScript 标准和 Web API。
- 提供更好的性能。
- 对现代浏览器和 Node.js 环境有更好的兼容性。

**Core-js 3 和 Babel 的兼容性：**

- Babel 会根据 **`corejs: 3`** 来自动填充 Polyfill，使得代码在不支持新特性的浏览器中也能够运行。

**总结**

- **Core-js** 是一个 **Polyfill** 库，提供对 **ECMAScript** 和 **Web API** 新特性的支持，确保你的代码在不支持这些新特性的浏览器或环境中能够运行。
- 它可以帮助你使用现代 JavaScript 特性（如 `Promise`、`Map`、`async/await` 等），而不必担心浏览器兼容性问题。
- 在 **Babel** 中，你可以通过 `@babel/preset-env` 配置，使用 `core-js` 自动为缺失的功能添加 Polyfill。
- **Core-js 3** 是最新的版本，它为现代浏览器提供了良好的支持，并能够自动引入必要的 Polyfill。

通过使用 **Core-js** 和 **Babel**，你可以更加高效地编写现代 JavaScript，同时确保代码在各种环境中的兼容性。如果你对 Core-js 配置、Polyfill 的选择等方面有任何疑问，随时告诉我！



是的，你的理解是正确的！在大多数现代前端项目中，尤其是在使用 **Vite**、**Webpack** 等构建工具时，通常 **不需要手动配置 Core-js**，因为这些构建工具已经为你配置好了默认的 **Polyfill** 和 **Babel** 转译规则。

为什么大部分情况下不需要手动配置 Core-js？

1. **Vite 和 esbuild 的自动支持**
   - **Vite** 默认使用 **esbuild** 作为构建工具，它已经处理了 **现代 JavaScript 语法的转译**，并且性能非常好。对于现代浏览器，esbuild 直接支持这些特性（如箭头函数、`class`、`async/await` 等），因此在开发中不需要手动引入 Core-js。
   - 如果你的项目目标是 **现代浏览器**，那么 esbuild 和 Vite 已经帮你完成了大部分兼容性处理，无需你手动处理。
2. **Polyfill 自动引入**
   - 你只需要关注编写现代 JavaScript 代码，构建工具（如 **Vite**）会根据目标环境自动选择需要的 **Polyfill**。比如，如果你只支持较新的浏览器，Vite 和 **esbuild** 会避免引入不必要的 Polyfill。
   - 只有当你需要兼容 **老旧浏览器**（如 **IE11**）时，才需要手动引入 **Core-js** 来填充缺失的功能。
3. **Babel 默认配置**
   - 如果你使用 **Babel**，并且在项目中配置了 **`@babel/preset-env`**，Babel 会自动根据你指定的目标环境（例如浏览器或 Node.js 版本）来选择需要的 Polyfill 并自动注入到代码中。
   - 在这种情况下，**Babel** 会自动处理 Polyfill，不需要你手动引入 **Core-js**，除非你有特定的需求。

**什么时候需要手动配置 Core-js？**

虽然大多数项目的默认构建流程已经帮你处理了兼容性问题，但在以下情况下你可能需要手动配置 Core-js：

1. **需要支持非常老旧的浏览器**：
   - 如果你要支持 **IE11** 或其他旧版浏览器，这时需要 **Polyfill** 来确保这些浏览器支持新特性。比如，`Promise`、`Map`、`Array.prototype.includes` 等特性在旧浏览器中是不存在的，Core-js 可以提供这些功能。
2. **更精确的 Polyfill 控制**：
   - 如果你希望只在代码中引入 **特定的 Polyfill**（而不是自动引入所有的 Polyfill），你可以手动配置 Core-js。例如，你只需要引入 `Array.prototype.includes` 的 Polyfill，而不需要引入全部的 ES6+ 特性。
3. **在 Babel 配置中使用 Core-js**：
   - 如果你使用 Babel 转译并且想要更精细的控制 Polyfill 的使用，你可以在 `.babelrc` 或 `babel.config.js` 文件中进行配置，指定如何和什么时候引入 **Core-js**。

**如何配置 Core-js（如果需要）**

如果你需要手动配置 Core-js，这里是一个典型的配置方式：

1. **安装 Core-js**

```bash
pnpm add core-js
```

2. **在 Babel 配置中启用 Core-js**

在你的 Babel 配置文件中，通常是 **`.babelrc`** 或 **`babel.config.js`**，你可以配置 `@babel/preset-env` 以及 Core-js。

**`babel.config.js` 示例：**

```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead", // 目标环境配置
        useBuiltIns: "entry",         // 使用 Core-js 进行 Polyfill
        corejs: 3                     // 使用 Core-js 版本 3
      }
    ]
  ]
};
```

- **`useBuiltIns: "entry"`**：这意味着你需要在入口文件（通常是 `index.js`）手动引入 `core-js`：

  ```javascript
  import "core-js/stable";   // 引入所有需要的 Polyfill
  import "regenerator-runtime/runtime";  // 如果使用 async/await，可能需要这个 Polyfill
  ```

- **`corejs: 3`**：指定使用 **Core-js 版本 3**。

3. **在 Vite 项目中使用**

如果你使用 Vite 并且想要使用 Babel 和 Core-js（尽管一般不需要），你可以安装 Babel 和 Core-js：

```bash
pnpm add -D @babel/core @babel/preset-env core-js
```

然后，在 `vite.config.js` 中添加 Babel 配置。

**总结**

- 在使用 **Vite** 和 **现代浏览器** 时，通常 **不需要手动配置 Core-js**，因为 Vite 和 esbuild 会自动处理大部分兼容性问题。
- 只有在 **需要支持老旧浏览器** 或 **需要更精细的 Polyfill 控制** 时，才需要手动配置 Core-js。
- 大部分项目的默认构建配置已经为你自动引入了必要的 Polyfill，特别是通过 **Babel** 和 **Vite** 的配置。

希望这能帮助你理解什么时候需要 Core-js，什么时候不需要。如果有更多问题，随时告诉我！





## http-server

**`http-server`** 是一个非常简单的 **Node.js** 工具，用于在本地快速启动一个静态文件服务器。它适用于静态网站、前端项目等的本地测试和开发，允许你快速查看 HTML、CSS、JavaScript 等文件在浏览器中的效果，而无需配置复杂的服务器环境。

**`http-server` 的基本用途**

- **快速启动静态文件服务器**：`http-server` 允许你在本地快速启动一个 HTTP 服务器，访问本地文件。它是用于 **开发和调试静态文件** 的一个非常方便的工具。
- **用于本地开发和测试**：当你在开发静态页面、前端项目或任何不需要后端逻辑的应用时，`http-server` 是一个非常简单的选择。

**安装 `http-server`**

`http-server` 是一个基于 **Node.js** 的命令行工具，你需要先安装它。可以通过 **npm** 或 **pnpm** 来全局安装。

**通过 npm 安装：**

```bash
npm install -g http-server
```

**通过 pnpm 安装：**

```bash
pnpm add -g http-server
```

**如何使用 `http-server`**

1. **进入你要服务的目录**：
    使用命令行进入你要通过 `http-server` 服务的项目或文件夹。假设你有一个包含 HTML 文件的项目文件夹：

   ```bash
   cd /path/to/your/project
   ```

2. **启动服务器**：
    在项目文件夹中运行以下命令启动服务器：

   ```bash
   http-server
   ```

   这会在默认端口（通常是 **8080**）启动一个 HTTP 服务器，并且输出类似以下的内容：

   ```bash
   Starting up http-server, serving ./
   Available on:
     http://127.0.0.1:8080
     http://192.168.0.2:8080
   Hit CTRL-C to stop the server
   ```

   你可以在浏览器中访问 `http://localhost:8080` 或 `http://127.0.0.1:8080` 来查看你的静态文件。

3. **指定端口号**：
    默认情况下，`http-server` 会启动在 **8080** 端口，但你也可以指定一个不同的端口号。例如，启动在 **3000** 端口：

   ```bash
   http-server -p 3000
   ```

4. **查看帮助文档**：
    如果你需要查看更多 `http-server` 的命令行选项，可以使用以下命令：

   ```bash
   http-server --help
   ```

   这会显示所有可用的配置选项，如端口设置、缓存控制、开启 SSL 等。

**常用命令和选项**

- **`-p` 或 `--port`**：指定服务器端口。

  例如，将服务器设置在 **3000** 端口：

  ```bash
  http-server -p 3000
  ```

- **`-o` 或 `--open`**：启动服务器时自动打开浏览器。

  例如：

  ```bash
  http-server -o
  ```

- **`-a` 或 `--address`**：指定服务器绑定的地址，默认是 `127.0.0.1`（即 localhost）。可以指定为 `0.0.0.0` 来允许外部设备访问。

  例如：

  ```bash
  http-server -a 0.0.0.0
  ```

- **`-c` 或 `--cache`**：设置缓存时间，单位为秒。可以指定缓存文件的存活时间，默认是 **3600 秒**（即 1 小时）。

  例如：

  ```bash
  http-server -c-1
  ```

- **`-S` 或 `--ssl`**：启用 HTTPS，`http-server` 允许你使用 SSL 证书提供加密连接（需要提供证书文件和密钥文件）。

  例如：

  ```bash
  http-server -S -C /path/to/cert.pem -K /path/to/key.pem
  ```

- **`-d` 或 `--directory`**：禁用目录列表。如果你没有设置一个首页（如 `index.html`），它会默认显示该目录下的文件列表。使用 `-d` 选项可以禁止这种行为。

  例如：

  ```bash
  http-server -d false
  ```

- **`-P` 或 `--proxy`**：设置代理服务器。你可以将请求代理到另一个 URL，适用于开发时跨域请求的场景。

  例如：

  ```bash
  http-server -P http://localhost:3000
  ```

**常见使用场景**

1. **开发和调试静态网站**：
    当你开发 **HTML/CSS/JavaScript** 网站时，你可以使用 `http-server` 来提供本地静态文件服务，方便你在浏览器中查看和调试。
2. **前端开发测试**：
    在前端开发过程中，你可能会需要查看通过 webpack、Vite 或其他构建工具构建后的静态资源。使用 `http-server` 启动一个本地服务器，帮助你快速查看构建后的效果。
3. **静态文件托管**：
    如果你有一些静态文件（如图片、CSS、JS 文件），并且不需要后端支持，只是想在本地或网络上托管这些文件，`http-server` 可以提供一个简单的解决方案。
4. **小型开发项目或原型演示**：
    在开发小型项目或快速演示时，`http-server` 是一个非常方便的工具，可以让你轻松展示 HTML/CSS/JS 项目，甚至可以作为本地服务器进行小范围演示。

**总结**

- **`http-server`** 是一个非常轻量级的 **Node.js 静态文件服务器**，适用于快速启动一个本地 HTTP 服务器，来查看 HTML、CSS、JS 等静态文件。
- 它不需要复杂的配置，只需通过命令行启动，即可提供本地开发和调试的服务器功能。
- **常见用途**：快速查看静态网站、前端项目的效果；开发过程中快速启动服务器进行小范围展示和测试。

如果你有任何问题，或者想了解更多 `http-server` 的使用技巧，随时告诉我！



# vitepress

VitePress 是一个基于 **Vite** 的静态网站生成器，专门用于构建文档站点，特别适合用来生成 **Markdown** 内容的文档站点。下面我们从头开始逐步了解如何构建一个 VitePress 项目。

**1. 安装 VitePress**

**步骤：**

- 你可以使用 **npm** 或 **pnpm** 安装 VitePress。

首先，初始化一个新的 **Node.js** 项目，确保你已经在项目目录下创建了 `package.json` 文件：

```bash
mkdir my-vitepress-project
cd my-vitepress-project
pnpm init
```

然后，安装 **VitePress**：

```bash
pnpm add vitepress
```

**2. 初始化项目结构**

在项目的根目录下，创建 **`docs`** 目录，并在其中创建一个 `index.md` 文件。`index.md` 将成为你站点的主页。

**目录结构：**

```bash
my-vitepress-project/
├── docs/
│   └── index.md
├── package.json
└── vitepress.config.js (可选，后续会创建)
```

**3. 创建首页 (index.md)**

在 `docs/index.md` 中编写你想展示的内容：

```markdown
# Welcome to VitePress

这是我的个人学习笔记站点。

## 技术栈
- **VitePress**：基于 Vite 的静态网站生成器。
- **Vue.js**：可嵌入 Vue 组件。
- **Markdown**：用于编写文档内容。

欢迎访问我的学习笔记！
```

**4. 启动本地开发服务器**

VitePress 使得本地开发非常方便，你可以在项目根目录下通过以下命令启动开发服务器：

```bash
pnpm run dev
```

VitePress 会自动启动一个本地开发服务器，默认访问地址是 `http://localhost:3000`。你可以在浏览器中查看并实时预览你的文档。

**5.  VitePress 配置文件 (docs/.vitepress/config.ts)**

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的学习笔记',
  description: '记录我学习过程中的各种知识点',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/前端' },
      { text: '测试页', link: '/test' }
    ],
    sidebar: {
      '/': [
        {
          text: '目录',
          items: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/前端' },
            { text: '测试页', link: '/test' }
          ]
        }
      ]
    }
  }
})

```

- **`title`**：站点的标题。
- **`description`**：站点的描述。
- **`themeConfig`**：包含站点的主题配置，例如导航栏、侧边栏等。

**6. 构建静态文件**

当你完成文档内容后，运行以下命令来生成静态文件：

```bash
pnpm run build
```

生成的静态文件将会位于 `dist/` 目录中。你可以将这些文件部署到任何静态网站托管平台（例如 GitHub Pages、Netlify、Vercel）上。

**7. 将项目推送到 GitHub**

在将项目部署到 Vercel 之前，你需要先将项目上传到 GitHub。

1. 在 GitHub 上创建一个新的仓库，例如 `my-vitepress-project`。
2. 将本地项目推送到 GitHub：

```bash
git init
git remote add origin https://github.com/lxy123hh/my-vitepress-project.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

**8. 部署到 Vercel**

1. 访问 [Vercel](https://vercel.com/) 并注册或登录。
2. 点击 **"New Project"**，选择从 **GitHub** 导入你的项目。
3. 选择你刚刚上传的仓库（例如 `my-vitepress-project`）。
4. Vercel 会自动检测到这是一个 **静态网站**，并建议你使用 **`npm run build`** 作为构建命令，输出目录为 **`dist`**。

Vercel 会自动为你部署项目，几秒钟后，你就可以通过 **Vercel 提供的 URL** 访问你的站点。

**9. 配置自定义域名 (可选)**

如果你有自己的域名，可以通过 Vercel 配置自定义域名：

1. 在 Vercel 项目设置中，选择 **Domains**。
2. 输入你自己的域名（例如 `my-vitepress-site.com`）。
3. 配置 DNS 记录，通常是将你的域名的 **CNAME** 记录指向 Vercel 提供的地址。





# 框架演进

**1. 早期 Web 开发：HTML + JavaScript (2000年代初期)**

在 Web 开发的早期，前端开发主要依赖 **HTML**、**CSS** 和 **JavaScript**，而动态效果和交互性都相对简单。用户输入和输出的交互是通过原生 JavaScript 来实现的。

**示例：**

用户在输入框中输入文字，点击按钮后显示输入的文字。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>输入框和按钮示例</title>
  <script>
    function displayData() {
      // 获取输入框中的内容
      const inputData = document.getElementById('inputData').value;
      // 将输入的内容显示到页面上的 <p> 标签中
      document.getElementById('output').innerText = '你输入的数据是: ' + inputData;
    }
  </script>
</head>
<body>
  <h1>请输入数据并显示</h1>
  <input type="text" id="inputData" placeholder="请输入数据" />
  <button onclick="displayData()">显示数据</button>
  <p id="output"></p>
</body>
</html>
```

**说明**：

- 用户输入数据后，点击按钮会触发 **`displayData()`** 函数。
- 函数通过 `document.getElementById()` 获取输入框的值，并显示在 `output` 的 `<p>` 标签内。

------

**2. jQuery 示例（2006年）**

**背景**：jQuery 简化了原生 JavaScript 的 DOM 操作和事件处理，使得 Web 开发更加高效。在 jQuery 时代，开发者可以通过简洁的 API 操作 DOM 元素。

**示例：**

使用 jQuery 让用户输入文字，点击按钮后显示输入的文字。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jQuery 示例</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function() {
      // 点击按钮时执行
      $('#btn').click(function() {
        // 获取输入框的值
        const inputData = $('#inputData').val();
        // 将输入的内容显示到页面上的 <p> 标签中
        $('#output').text('你输入的数据是: ' + inputData);
      });
    });
  </script>
</head>
<body>
  <h1>请输入数据并显示</h1>
  <input type="text" id="inputData" placeholder="请输入数据" />
  <button id="btn">显示数据</button>
  <p id="output"></p>
</body>
</html>
```

**说明**：

- 通过 **jQuery** 选择器 `$('#btn')` 绑定点击事件，`$('#inputData').val()` 获取输入框的值。
- 使用 `$('#output').text()` 更新页面上的文本。

------

**3. AngularJS 示例（2010年）**

**背景**：**AngularJS** 是由 Google 推出的一个前端框架，采用了 **双向数据绑定**，使得开发者可以更方便地同步模型和视图。

**示例：**

AngularJS 示例，通过双向数据绑定显示输入的数据。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AngularJS 示例</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('myApp', [])
      .controller('myCtrl', function($scope) {
        $scope.inputData = '';  // 绑定到输入框
        $scope.outputData = ''; // 显示在页面上的数据
        $scope.displayData = function() {
          $scope.outputData = $scope.inputData;
        };
      });
  </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
  <h1>请输入数据并显示</h1>
  <input type="text" ng-model="inputData" placeholder="请输入数据" />
  <button ng-click="displayData()">显示数据</button>
  <p>你输入的数据是: {{ outputData }}</p>
</body>
</html>
```

**说明**：

- **双向数据绑定**：`ng-model="inputData"` 使得输入框的值与 `$scope.inputData` 变量保持同步。
- 点击按钮时，`displayData()` 方法将 `inputData` 的值赋给 `outputData`，并通过 Angular 的双向数据绑定更新页面。

------

**4. React 示例（2013年）**

**背景**：**React** 是由 **Facebook** 开发的 UI 库，强调组件化和单向数据流。React 通过 **虚拟 DOM** 提高了渲染性能，并简化了应用的开发。

**示例：**

React 示例，通过 **useState** 管理输入的数据，并点击按钮后显示。

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const displayData = () => {
    setOutputData(inputData);
  };

  return (
    <div>
      <h1>请输入数据并显示</h1>
      <input type="text" value={inputData} onChange={handleInputChange} placeholder="请输入数据" />
      <button onClick={displayData}>显示数据</button>
      <p>你输入的数据是: {outputData}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

**说明**：

- 使用 `useState` 管理输入框的值和显示的值。
- `onChange` 事件处理函数同步更新输入框的值，点击按钮时更新显示内容。

------

**5. Vue.js 示例（2014年）**

**背景**：**Vue.js** 是一个轻量级的渐进式框架，旨在简化开发过程，尤其适合构建单页面应用（SPA）。

**示例：**

Vue.js 示例，通过 **v-model** 实现双向绑定，实现输入数据并显示的功能。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js 示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
</head>
<body>
  <div id="app">
    <h1>请输入数据并显示</h1>
    <input v-model="inputData" placeholder="请输入数据" />
    <button @click="displayData">显示数据</button>
    <p>你输入的数据是: {{ outputData }}</p>
  </div>

  <script>
    new Vue({
      el: '#app',
      data: {
        inputData: '',
        outputData: ''
      },
      methods: {
        displayData() {
          this.outputData = this.inputData;
        }
      }
    });
  </script>
</body>
</html>
```

**说明**：

- **v-model** 实现双向数据绑定，`inputData` 与输入框内容保持同步。
- 点击按钮时，调用 `displayData()` 方法，将输入的内容赋值给 `outputData`，并在页面上显示。

------

**6. Angular（2016年）**

**背景**：**Angular** 是由 **Google** 开发的完整前端框架，使用 **TypeScript**，强调 **模块化**、**组件化** 和 **依赖注入**。

**示例：**

Angular 示例，通过 **ngModel** 双向绑定实现输入框和显示区域的交互。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angular 示例</title>
  <script src="https://cdn.jsdelivr.net/npm/@angular/core@12.1.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/@angular/platform-browser@12.1.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/@angular/common@12.1.0"></script>
  <script>
    const { Component, NgModule } = window['ng'];

    @Component({
      selector: 'app-root',
      template: `
        <h1>请输入数据并显示</h1>
        <input [(ngModel)]="inputData" placeholder="请输入数据">
        <button (click)="displayData()">显示数据</button>
        <p>你输入的数据是: {{ outputData }}</p>
      `
    })
    class AppComponent {
      inputData = '';
      outputData = '';
      
      displayData() {
        this.outputData = this.inputData;
      }
    }

    @NgModule({
      declarations: [AppComponent],
      imports: [window['ng'].FormsModule],
      bootstrap: [AppComponent]
    })
    class AppModule {}

    window['ng'].platformBrowserDynamic().bootstrapModule(AppModule);
  </script>
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**说明**：

- **ngModel** 用于双向数据绑定，实现输入框和数据的同步。
- 点击按钮时，`displayData()` 方法更新 `outputData` 并在页面上显示。

------

**总结**

1. **早期开发（HTML + JavaScript）**：手动操作 DOM 元素和事件，适用于简单的页面交互。
2. **jQuery**：简化了 DOM 操作和事件处理，使得开发更加高效，特别是在兼容性方面。
3. **AngularJS**：引入了双向数据绑定、依赖注入等概念，简化了前端开发中的数据管理和视图更新。
4. **React**：通过组件化和虚拟 DOM 提高了性能和可维护性，采用单向数据流。
5. **Vue.js**：轻量、渐进式的框架，通过简洁的 API 和双向数据绑定简化开发过程。
6. **Angular**：全栈框架，支持模块化和组件化，提供更强的类型安全（TypeScript）。

每个阶段的框架都有其独特的优势，随着技术的进步，前端框架变得越来越强大，适应了更复杂的应用场景。希望这些示例能帮助你理解不同框架的演进过程！





# 响应性和响应式

**响应性**（Reactivity）和 **响应式设计** 是两个不同的概念，尽管它们有相似的名字，但它们在前端开发中的含义和应用是不同的。

**响应性（Reactivity）**：

**响应性**是指数据变化能够自动触发视图更新，通常应用于 **前端开发框架** 中。响应性是一种 **编程模型**，使得数据和 UI 之间的关系变得自动化。当数据变化时，系统会自动“响应”这种变化，更新 UI，无需手动干预。

在响应式系统中，开发者不需要显式地更新 DOM 或视图，框架会自动检测数据的变化，并将变化反映到视图层。这是现代前端框架（如 **Vue.js**、**React**）中常见的特性。

**响应性在 Vue.js 中的例子**：

Vue.js 是一个非常典型的响应式框架。它通过 **数据绑定** 和 **依赖追踪** 使得前端组件能够自动响应数据变化。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js 响应性示例</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">点击我更改消息</button>
  </div>

  <script>
    new Vue({
      el: '#app',
      data: {
        message: '你好，Vue!'
      },
      methods: {
        changeMessage() {
          this.message = '你点击了按钮！';  // 当数据变化时，Vue 会自动更新视图
        }
      }
    });
  </script>
</body>
</html>
```

**如何工作：**

- Vue 会 **自动追踪** `message` 变量的变化。
- 当用户点击按钮时，`changeMessage` 方法会改变 `message` 的值。
- 因为 `message` 与视图绑定，Vue 会 **自动更新** 页面中的文本内容，无需手动操作 DOM。

**响应性的关键概念：**

1. **数据绑定**：数据和视图是双向绑定的，当数据改变时，视图会自动更新。
2. **依赖追踪**：框架会自动追踪哪些视图依赖于哪些数据，数据一旦变化，相关视图就会更新。
3. **自动更新**：用户不需要显式地操作 DOM，框架会在数据变化时自动更新视图。

**响应性与响应式设计的区别：**

- **响应性**（Reactivity）指的是数据变化后，UI 自动更新的机制。常见于前端框架中（如 Vue.js、React、Svelte 等）。

  例如，在 Vue.js 中，当数据模型（如 `message`）变化时，视图（如 `h1` 标签）会自动更新。这种变化是 **自动的**，不需要手动操作 DOM。

- **响应式设计**（Responsive Design）则主要是一个 **布局** 的概念，指的是页面根据不同的设备尺寸（如手机、平板、桌面）自动调整其布局，使其在各种屏幕上都能有良好的显示效果。

**总结：**

- **响应性（Reactivity）** 是一种数据和视图的自动绑定，数据变化时视图自动更新，通常在现代前端框架中使用。
- **响应式设计（Responsive Design）** 是指网页的布局能够根据设备尺寸和屏幕大小自动适应，以优化用户体验。









# vue

## 创建

使用 **Vite** 创建 Vue 3 项目（推荐方法）

**Vite** 是 Vue 官方推荐的现代前端构建工具，特别适用于 Vue 3 项目的开发，具有极快的热更新速度和良好的开发体验。

**步骤 1：使用 pnpm 创建 Vue 3 项目**

你可以通过以下命令来使用 **Vite** 创建 Vue 3 项目：

```bash
# 使用 pnpm 创建一个 Vue 3 项目
pnpm create vite@latest my-vue3-app 
```

- `pnpm create vite@latest`：使用 `pnpm` 来执行 `create-vite` 脚手架命令，创建一个新的 Vite 项目。
- `my-vue3-app`：这是你创建的项目名称，可以替换为你自己的项目名称。（可省略）

**步骤 2：进入项目目录并安装依赖**

```bash
# 进入项目目录
cd my-vue3-app

# 使用 pnpm 安装项目依赖
pnpm install
```

**步骤 3：启动开发服务器**

```bash
# 启动开发服务器
pnpm run dev
```

这样，你就会在浏览器中看到 Vue 3 的默认开发页面，项目也已经创建好并且能够进行开发了。

------

使用 **Vue CLI** 创建 Vue 3 项目（旧方法）

如果你使用的是 **Vue CLI**（虽然现在推荐使用 Vite，但 Vue CLI 依然可用），你可以通过以下命令来创建 Vue 项目：

1. **安装 Vue CLI**（如果你还没有安装 Vue CLI）：

   ```bash
   pnpm add -g @vue/cli
   ```

2. **创建 Vue 项目**：

   ```bash
   vue create my-vue-app
   ```

3. **选择 Vue 3 配置**：当提示选择项目配置时，选择 Vue 3。

4. **安装依赖并启动项目**：

   ```bash
   cd my-vue-app
   pnpm install
   pnpm run serve
   ```





## 解构赋值

理解这行代码 **`const { createApp } = Vue;`**，首先要理解 **解构赋值** 和 **Vue 对象的结构**。

**1. 解构赋值（Destructuring Assignment）**

解构赋值是 JavaScript 的一个语法特性，它允许你从对象或数组中提取值，并把这些值赋给变量。其语法如下：

对象解构赋值：

```js
const { name, age } = person;
```

这行代码的意思是从 `person` 对象中提取出 `name` 和 `age` 属性的值，并将其分别赋值给变量 `name` 和 `age`。

**2. Vue 是什么**

在 Vue 3 中，`Vue` 是一个全局对象，它包含了 Vue 框架的所有方法和属性。`createApp` 是 Vue 3 中用来创建 Vue 应用实例的方法。

**3. `const { createApp } = Vue;` 的含义**

这行代码的意思是：

1. **从 `Vue` 对象中提取 `createApp` 方法**。
   - `Vue` 是 Vue.js 框架的全局对象，包含许多方法和属性。
   - `createApp` 是 `Vue` 对象中的一个方法，它用于创建 Vue 应用实例。
2. **将 `createApp` 赋值给常量 `createApp`**。
   - `createApp` 方法将被提取出来并赋给常量 `createApp`，这样你就可以直接使用 `createApp` 来创建 Vue 应用实例，而不需要每次都写 `Vue.createApp`。

例如：

```js
// Vue 是一个对象，包含很多属性和方法
const Vue = {
  createApp: function() {
    console.log("Creating Vue app...");
  },
  otherMethod: function() {
    console.log("Other method...");
  }
};

// 解构 Vue 对象，提取 createApp 方法
const { createApp } = Vue;

// 使用解构出来的 createApp 方法
createApp();  // 输出: Creating Vue app...
```

**4. 解构赋值的简化：**

使用 **解构赋值**，你可以直接访问 Vue 对象中的 `createApp` 方法，而不需要通过 `Vue.createApp` 来调用它。例如：

```js
const { createApp } = Vue;

// 等价于
Vue.createApp();
```

通过解构赋值，你直接从 `Vue` 对象中提取了 `createApp` 方法，使得代码更加简洁。这样，你在使用 `createApp` 时就不需要每次都写 `Vue.createApp`，只需直接写 `createApp()`。

**5. Vue.js 中的 `createApp`**

在 Vue 3 中，`createApp` 是用于创建一个新的 Vue 应用实例的方法，而不是像 Vue 2.x 中那样直接通过 `new Vue()` 来创建 Vue 实例。

```js
const { createApp } = Vue;

// 定义一个 Vue 组件
const App = {
  data() {
    return {
      message: "Hello, Vue 3!"
    };
  },
  template: `<div>{{ message }}</div>`
};

// 使用 createApp 创建应用并挂载
createApp(App).mount('#app');
```







## 主流开发风格

Vue 3 主要有两种主流的开发风格，分别是：

1. **Composition API（`setup()` 函数）** - 推荐用于中大型项目，具有更好的逻辑组织和复用性。
2. **Options API（传统风格）** - 更适合小型项目，逻辑简单，易于理解。

我会从这两种开发风格出发，分别讲解它们的使用方式、优缺点、适用场景，并展示如何用它们写一个常见的 Vue 3 组件。

------

🌱 一、Composition API（`setup()` 函数）

Vue 3 引入的 **Composition API** 是当前 **主流的开发方式**，它提供了更强大的灵活性，适用于中大型项目，特别是在需要逻辑复用时，它非常适合。

**使用场景**：

- **复杂逻辑**：当组件中的逻辑比较复杂时，Composition API 会让代码更加清晰易读。
- **逻辑复用**：可以方便地在多个组件间复用逻辑。
- **支持 TypeScript**：对于使用 TypeScript 的开发者来说，Composition API 提供了更好的类型推导。

**核心概念**：

1. **`setup()` 函数**：Vue 3 中的组件入口函数。`setup()` 是组件初始化时执行的函数，所有的响应式数据、方法、计算属性都应该在 `setup()` 中定义。
2. **`ref()` 和 `reactive()`**：Vue 3 使用 `ref()` 和 `reactive()` 来创建响应式数据。
3. **`computed()`**：用于计算属性。
4. **`watch()`**：用于监听数据变化。

**Composition API 示例**：

`App.vue` 使用 Composition API：

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">点击修改消息</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 使用 `ref()` 创建响应式数据
const message = ref('Hello, Vue 3!')

// 定义修改消息的方法
const changeMessage = () => {
  message.value = 'Message Changed!'
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
```

**解释**：

- **`ref()`**：创建响应式数据 `message`，Vue 会自动追踪数据的变化，修改后页面会自动更新。
- **`setup()` 语法糖**：不需要手动写 `return`，变量 `message` 和方法 `changeMessage` 会自动暴露给模板。
- **`v-bind` 和 `v-on`**：可以使用 Vue 的简写语法，`@click` 代表绑定点击事件，`{{ message }}` 是绑定数据。

------

🌿 二、Options API（传统写法）

Vue 2 中的写法叫做 **Options API**，它仍然在 Vue 3 中被广泛使用，并且对初学者来说非常友好。Vue 3 保持了 Options API，它采用数据、方法、计算属性等选项来组织组件。

**使用场景**：

- **小型项目**：当项目较小，逻辑不复杂时，Options API 可能会更直观。
- **过渡期项目**：从 Vue 2 迁移到 Vue 3 时，Options API 可以保持较低的学习曲线。
- **快速原型开发**：如果需要快速展示效果，可以使用 Options API。

**核心概念**：

- **`data`**：用于定义组件的数据。
- **`methods`**：用于定义组件的行为和方法。
- **`computed`**：用于定义计算属性。
- **`watch`**：用于监听数据变化。

**Options API 示例**：

`App.vue` 使用 Options API：

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">点击修改消息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Vue 3!'
    }
  },
  methods: {
    changeMessage() {
      this.message = 'Message Changed!'
    }
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
```

**解释**：

- **`data`**：定义了 `message` 变量，默认值是 `'Hello, Vue 3!'`。
- **`methods`**：定义了一个 `changeMessage` 方法，用来修改 `message` 的值。
- **`v-on`**：`@click="changeMessage"` 绑定点击事件，点击按钮时调用 `changeMessage` 方法。

------



## 语法糖

------

1. **`<script setup>` 语法糖**

**背景**：`<script setup>` 语法糖是 Vue 3 提供的，用来简化 `setup()` 函数的写法。它使得组件的代码更加简洁，并自动暴露所有定义的变量和方法给模板。

**示例**：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>
```

- **作用**：省去了 `export default` 和 `return`，使得代码更加简洁。

- **等价于**：

  ```vue
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const count = ref(0)
      const increment = () => {
        count.value++
      }
      return { count, increment }
    }
  }
  </script>
  ```

------

2. **`v-bind` 的简写 `:`**

在 Vue 中，`v-bind` 用于绑定属性，它有一个简写方式：冒号 `:`。

**示例**：

```html
<template>
  <img :src="imageUrl" alt="图片" />
</template>

<script setup>
const imageUrl = 'https://example.com/logo.png'
</script>
```

- 等价于：

  ```html
  <img v-bind:src="imageUrl" alt="description">
  ```

- **作用**：简化了绑定属性的写法，特别是在动态绑定多个属性时更为方便。

------

3. **`v-on` 的简写 `@`**

在 Vue 中，`v-on` 用于绑定事件，它也有一个简写方式：`@` 符号。

**示例**：

```html
<button @click="handleClick">点击我</button>
```

- 等价于：

  ```html
  <button v-on:click="handleClick">点击我</button>
  ```

- **作用**：简化了事件绑定的写法，常用于监听用户交互事件。

------

4. **`v-model` 双向绑定简写**

`v-model` 是 Vue 中用来实现双向数据绑定的指令，Vue 3 中对其进行了改进，使其更加灵活。

**示例**：

```html
<input v-model="message" />
```

- **作用**：自动将输入框的值和 `message` 变量双向绑定。

Vue 3 还允许 `v-model` 有 **多个修饰符**，比如你可以指定某个组件的 prop 名称（默认是 `modelValue`）：

```html
<MyComponent v-model:modelValue="message" />
```

------

5. **计算属性的简写 `computed`**

在 Vue 3 中，`computed` 属性可以更简洁地在组件中定义，尤其是使用 Composition API 时。

**示例**：

```javascript
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
```

- **作用**：用于根据其他数据动态计算一个值，而不用手动创建 getter 和 setter。

------

6. **`$refs` 的简写**

`$refs` 用于引用 DOM 元素或子组件。在 Vue 3 中，我们可以更简洁地使用 `ref` 来创建和访问 DOM 元素或组件实例。

**示例**：

```html
<input ref="inputElement" />
```

- 然后在 JavaScript 中，直接通过 `this.$refs.inputElement` 访问。

------

7. **`v-for` 的简写**

在 Vue 中，`v-for` 用于循环渲染元素，它有一个简写方式：可以省略 `v-for` 的部分 `in`。

**示例**：

```html
<ul>
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</ul>
```

- 等价于：

  ```html
  <ul>
    <li v-for="(item, index) in items" :key="item.id">{{ item.name }}</li>
  </ul>
  ```

------

8. **`v-if` + `v-else` 的简写**

`v-if` 和 `v-else` 可以通过 **`v-if` + `v-else-if`** 来处理条件渲染，减少代码冗余。

**示例**：

```html
<p v-if="isVisible">可见的内容</p>
<p v-else>不可见的内容</p>
```

- 这种简写方式让条件渲染的写法更加紧凑。

------

9. **`provide/inject` 的简写**

Vue 3 提供了 `provide` 和 `inject` 来传递跨组件的数据。这两者之间的关系在 Composition API 中非常简洁。

**示例**：

```javascript
// 父组件
provide('message', 'Hello World')

// 子组件
inject('message') // 获取父组件提供的数据
```

- **作用**：简化了跨层级传递数据的方式，使得深层嵌套的组件也能快速访问到上级组件的数据。

------

10. **`v-bind` 和 `v-on` 的对象语法**

Vue 3 支持通过对象来绑定多个属性或事件，这使得开发变得更加简洁和灵活。

**示例**：

```html
<!-- v-bind 对象语法 -->
<button v-bind="buttonProps">按钮</button>
const buttonProps = {
  type: 'submit',
  disabled: true
}
```

- **作用**：避免为每个属性单独写 `v-bind:prop`，简化了大量的代码。

**事件绑定对象语法**：

```html
<button v-on="clickEvents">按钮</button>
const clickEvents = {
  click: () => { console.log('按钮点击！'); },
  mouseover: () => { console.log('鼠标悬停！'); }
}
```



## 基本结构

------

🏗️ 项目结构预览（简化版）

假设你生成了一个叫 `learn_vue` 的项目，结构大致如下：

```
learn_vue/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── assets/
    │   └── vue.svg
    ├── App.vue
    └── main.js
```

------

🧩 1. `index.html`（整个项目的入口 HTML）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

每行解释：

- `<!DOCTYPE html>`：声明 HTML5 文档类型。
- `<html lang="en">`：定义网页语言为英文。
- `<meta charset="UTF-8" />`：设置字符编码，支持中文等。
- `<link rel="icon"...>`：引入浏览器标签页上的图标。
- `<meta name="viewport"...>`：设置响应式视图。
- `<title>Vite + Vue</title>`：页面标题。
- `<div id="app"></div>`：Vue 应用的“挂载点”。
- `<script type="module" src="/src/main.js">`：
  - 加载你写的 Vue 应用入口文件。
  - `type="module"` 是必须的，支持 ES6 模块导入语法。

🧠 结论：**index.html 是 Vue 应用真正运行的页面，Vue 会把页面挂载在 #app 上。**

------

🚪 2. `src/main.js`（Vue 应用的入口 JS）

```js
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')
```

每行解释：

`import { createApp } from 'vue'`

- 从 Vue 框架中导入 `createApp` 方法。
- 这是 Vue 3 用来创建应用实例的标准方式（Vue 2 用的是 `new Vue()`）。

`import App from './App.vue'`

- 导入你写的根组件 `App.vue`，整个页面的组件树都从它开始。

`import './assets/main.css'`

- 导入全局样式表。

`createApp(App).mount('#app')`

- `createApp(App)`：创建 Vue 应用实例，根组件是 `App`。
- `.mount('#app')`：把这个 Vue 应用挂载到 `index.html` 的 `<div id="app">` 上。

🧠 结论：**main.js 是 Vue 项目的 JS 启动器，它告诉浏览器从 App.vue 开始，挂到 index.html 上。**

------

🧱 3. `src/App.vue`（项目的根组件）

```vue
<template>
  <img alt="Vue logo" src="./assets/vue.svg" />
  <h1>Hello Vue 3 + Vite</h1>
  <p>Edit <code>App.vue</code> to get started.</p>
</template>

<script setup>
// 暂无逻辑代码
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
```

分块解释：

`<template>`

- 页面模板，渲染出来的 HTML 内容。
- `{{ }}` 插值表达式也写在这里。

`<script setup>`

- Vue 3 的语法糖方式（推荐）。
- 会自动转译成标准的 `setup()` 函数。
- 此处没有内容，说明组件暂时没有逻辑。

`<style scoped>`

- 组件私有样式，**只影响当前组件**。
- `scoped` 会让 Vue 自动给选择器加上特定的作用域 hash，防止污染全局样式。

🧠 结论：**App.vue 是 Vue 应用的第一个组件，也是其他组件的“根”。从它开始会逐步加载其他子组件。**

------

🎨 4. `src/assets/`（静态资源文件夹）

包含项目用到的图片、图标、CSS 文件等：

- `vue.svg`：Vue logo 图标。
- `main.css`：可放置全局样式、重置样式等。

------

📦 5. `package.json`（项目元信息 + 命令 + 依赖）

```json
{
  "name": "learn_vue",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

核心字段解释：

- `"scripts"`：运行命令。
  - `pnpm run dev` → 启动开发服务器。
  - `pnpm run build` → 打包项目到 dist。
  - `pnpm run preview` → 预览 build 后的内容。
- `"dependencies"`：运行项目时需要的库。
- `"devDependencies"`：开发时使用的工具，比如构建工具 vite。

------

⚙️ 6. `vite.config.js`（Vite 的配置文件）

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

每行解释：

- `defineConfig()`：Vite 提供的配置包装函数，提供类型提示。
- `@vitejs/plugin-vue`：Vue 插件，使 Vite 能正确处理 `.vue` 文件。
- `plugins: [vue()]`：把插件挂进来。

🧠 结论：**这是项目的构建配置文件，一般默认就够用，除非你要自定义别名、端口等。**

------

🔗 它们之间如何联通？

```
index.html
    ⬇ 引入
src/main.js
    ⬇ 加载
App.vue
    ⬇ 渲染
template → 视图
script   → 逻辑
style    → 样式
```

------

✅ 总结：从启动到页面渲染流程图

```bash
pnpm run dev
     ↓
vite 启动开发服务器
     ↓
浏览器打开 index.html
     ↓
加载 main.js
     ↓
createApp(App).mount('#app')
     ↓
App.vue 中 template 渲染内容
```

------



大多数情况下，**不需要去动 `main.js`、`index.html`、`vite.config.js` 这些核心文件**，它们就像项目的“骨架”和“地基”，一开始搭好就能一直用。

------

🧱 后续开发的核心任务就是 —— 写 `.vue` 组件！

也就是说：

你主要要做的是：

| 要做的事     | 举例                                       |
| ------------ | ------------------------------------------ |
| 新增组件     | `src/components/MyButton.vue`              |
| 引入组件     | 在 `App.vue` 或其他组件中 `import`         |
| 组织页面逻辑 | 在 `<script setup>` 中写响应式数据、事件等 |
| 搭页面       | 在 `<template>` 中用 HTML + 组件组合页面   |
| 写样式       | 在 `<style scoped>` 中写局部样式           |

------

🧭 正常开发流程是这样的：

1. **`main.js` 和 `App.vue` 保持不动**（它们只是挂载入口）

2. **你创建多个组件放在 `src/components/` 里**

   - 比如：`LoginForm.vue`, `UserList.vue`, `NavBar.vue` 等
   - 每个单文件组件都会被import vue from '@vitejs/plugin-vue'编译为js模块

3. **在 `App.vue` 或其他页面中使用这些组件**

   ```vue
   <script setup>
   import NavBar from './components/NavBar.vue'
   </script>
   
   <template>
     <NavBar />
     <router-view /> <!-- 路由页面会显示在这里 -->
   </template>
   ```

4. **如果用到路由或 Vuex 等全局功能**

   - 配置一次，在 `main.js` 引入即可，以后也基本不用动。

------

📁 推荐的目录结构（项目变大后）

```
src/
├── assets/          # 静态资源：图片、全局 CSS
├── components/      # 通用组件（可以复用）
├── views/           # 页面组件（每个路由页一个 .vue）
├── router/          # 路由配置（如 router/index.js）
├── store/           # 状态管理（如 Vuex / Pinia）
├── App.vue          # 根组件
└── main.js          # 应用入口
```

------







## 事件捕获和冒泡

------

🧠 1. **事件捕获与冒泡的使用场景**

**场景 1：父级拦截子级事件（事件捕获）**

假设你有一个复杂的组件结构，父组件包含了许多子组件，你可能希望在**事件到达目标元素之前**，父组件先进行一些拦截处理。这个时候，**事件捕获**非常有用。

**应用场景：实现父组件对某些事件的控制**

- **比如**：你希望父级组件在子级组件点击时执行某些操作，比如关闭菜单、隐藏弹窗等。

```html
<div id="parent" style="width: 300px; height: 300px; background-color: lightblue;">
  <button id="child" style="margin: 50px;">点击按钮</button>
</div>

<script>
document.getElementById("parent").addEventListener("click", function() {
  alert("父组件捕获阶段");
}, true); // 设置为捕获阶段，父级先捕获

document.getElementById("child").addEventListener("click", function() {
  alert("子组件被点击");
});
</script>
```

- **点击顺序：**
  1. 事件从 `parent` 开始捕获，先弹出 `父组件捕获阶段` 的提示框。
  2. 然后事件传播到目标元素 `button`，弹出 `子组件被点击` 的提示框。

**为什么使用事件捕获？**

- 你可以在事件到达子元素之前，执行一些全局性的行为，比如阻止默认行为、拦截某些特定的交互操作。

------

**场景 2：事件委托（冒泡）**

**事件冒泡**通常用来实现**事件委托**，即通过将多个子元素的事件处理程序委托给它们的父元素来减少内存开销和代码冗余。通过事件冒泡，父级元素可以监听所有子元素的事件。

**应用场景：事件委托**

- **比如**：你有一个动态生成的列表，其中的每个列表项都可能会绑定点击事件。你可以通过父级元素统一监听这些事件，避免为每个子项单独绑定事件。

```html
<ul id="parent">
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<script>
document.getElementById("parent").addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    alert(`你点击了 ${event.target.innerText}`);
  }
});
</script>
```

- **解释**：点击 `li` 元素时，事件会冒泡到父级 `ul` 元素，`ul` 会捕获并处理子元素的点击事件。
- **优点**：避免了为每个 `li` 元素单独绑定事件，可以动态生成列表并且仍然能正常处理点击事件。

------

**场景 3：阻止事件传播**

你可能希望某些事件在触发后**不再传播**到父级元素，防止触发父级的事件处理器。在这种情况下，**事件冒泡需要被阻止**。

**应用场景：阻止点击事件冒泡**

- **比如**：在弹窗中，点击关闭按钮时，**防止点击关闭按钮后，父级元素的点击事件被触发**，进而触发一些不必要的操作。

```html
<div id="parent" style="width: 300px; height: 300px; background-color: lightblue;">
  <div id="modal" style="width: 200px; height: 200px; background-color: white;">
    <button id="closeButton">关闭</button>
  </div>
</div>

<script>
document.getElementById("parent").addEventListener("click", function() {
  alert("父组件点击");
});

document.getElementById("closeButton").addEventListener("click", function(event) {
  event.stopPropagation(); // 阻止事件冒泡
  alert("关闭按钮点击");
});
</script>
```

- **点击顺序：**
  1. 点击关闭按钮时，`stopPropagation()` 阻止了事件冒泡，所以父级 `div` 的点击事件没有被触发。
  2. 弹窗的点击事件（关闭按钮）被处理，父级事件被“拦截”。

**为什么使用 `stopPropagation()`？**

- 防止子组件的事件传播到父组件，避免触发不必要的父组件事件。

------

**场景 4：实现页面级的点击事件管理**

假设你有一个页面，其中的很多区域都需要响应点击事件，你可以通过事件冒泡来 **统一管理页面级的点击事件**，避免为每个区域分别添加事件监听器。

**应用场景：全局点击监听**

- **比如**：你希望在用户点击页面的任意地方时隐藏弹窗或菜单。

```html
<div id="menu" style="display: block;">菜单</div>
<button id="toggleButton">点击切换菜单</button>

<script>
document.body.addEventListener("click", function(event) {
  const menu = document.getElementById("menu");
  const button = document.getElementById("toggleButton");

  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.style.display = 'none'; // 点击页面其他区域隐藏菜单
  }
});

document.getElementById("toggleButton").addEventListener("click", function(event) {
  event.stopPropagation(); // 阻止按钮点击事件传播，防止触发 body 事件
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
</script>
```

- **解释**：点击按钮时，菜单的显示或隐藏会切换；点击页面其他区域时，菜单会被隐藏。

------

🎯 总结：事件捕获与冒泡的应用

| 特性             | **事件捕获**                                | **事件冒泡**                            |
| ---------------- | ------------------------------------------- | --------------------------------------- |
| **传播顺序**     | 从外向内传播，先触发外层再触发目标元素      | 从内向外传播，先触发目标元素再触发外层  |
| **常用场景**     | 父级拦截子级事件                            | 事件委托，父级处理子级元素的事件        |
| **如何阻止传播** | 使用 `addEventListener` 设置捕获阶段 `true` | 使用 `event.stopPropagation()` 阻止冒泡 |
| **应用场景**     | 在父级先做处理，阻止子级事件                | 管理复杂的事件逻辑，减少代码冗余        |

------

💡 小贴士：

- 默认情况下，事件是以 **冒泡模式** 传播的。如果你想优先处理父元素的事件，可以启用 **事件捕获**。
- **事件委托**：用事件冒泡来优化性能，减少绑定事件的数量，特别是动态元素。
- 使用 `event.stopPropagation()` 可以阻止事件继续传播，适用于控制事件流的某些操作。





## 模板指令

### v-on

`v-on` 是 Vue 中最常用的指令之一，用于绑定事件监听器。它的作用是将 DOM 事件（如点击、鼠标移入等）与 Vue 组件的方法连接起来，从而实现用户交互。

一、`v-on` 简介

**`v-on`** 是 Vue 用来绑定事件监听的指令。它让你能够在 Vue 组件中以声明式的方式响应 DOM 事件，比如：`click`、`input`、`keydown` 等。

语法

```html
v-on:事件名="方法或表达式"
```

- **事件名**：要监听的 DOM 事件，比如 `click`、`keyup` 等。
- **方法或表达式**：事件发生时触发的函数或表达式。

1. `v-on` 的基本用法

```vue
<template>
  <button v-on:click="increment">点击我</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<p>当前计数：{{ count }}</p>
```

**解释**：

- `v-on:click="increment"`：监听按钮的点击事件，当点击按钮时，会执行 `increment` 方法。
- `increment()` 方法会让 `count` 变量的值增加 1。

2. `v-on` 的简写：`@`

Vue 支持事件绑定的简写，`v-on` 可以写成 `@`，让代码更简洁。

```vue
<button @click="increment">点击我</button>
```

上面的 `@click="increment"` 和 `v-on:click="increment"` 是等价的。

------

二、常见用法

1. **绑定常见事件**

`v-on` 用于绑定用户交互事件，比如点击、鼠标悬浮等。

**点击事件**

```vue
<button @click="handleClick">点击</button>
```

- `@click`：点击事件，点击按钮时会调用 `handleClick()` 方法。

**输入框事件**

```vue
<input @input="handleInput" />
```

- `@input`：每次用户输入时调用 `handleInput()` 方法，适用于表单输入。

**键盘事件**

```vue
<input @keydown="handleKeydown" />
```

- `@keydown`：每次按下键盘时调用 `handleKeydown()` 方法。

------

2. **事件修饰符**

Vue 提供了**事件修饰符**，让你更方便地处理事件。例如，常见的修饰符包括 `.stop`、`.prevent`、`.capture`、`.once` 等。

**`.stop`：阻止事件冒泡**

```vue
<button @click.stop="handleClick">点击</button>
```

- 阻止事件冒泡，使得父元素的 `click` 事件不会触发。

**`.prevent`：阻止默认行为**

```vue
<form @submit.prevent="handleSubmit">提交</form>
```

- 阻止表单的默认提交行为，可以用来自定义提交操作。

**`.capture`：事件捕获模式**

```vue
<button @click.capture="handleClick">点击</button>
```

- 改变事件的传播方式，**使用捕获模式**（先触发父级再触发子级）。

**`.once`：只触发一次**

```vue
<button @click.once="handleClick">点击</button>
```

- 事件只会触发一次，之后不再触发。

------

3. **传递事件对象**

你可以在事件处理函数中获取原生事件对象，**通过 `$event` 来访问**。

```vue
<button @click="handleClick($event)">点击</button>
function handleClick(event) {
  console.log(event)  // 获取原生事件对象
}
```

------

4. **事件修饰符的组合**

你可以组合多个事件修饰符。例如，你可能会想阻止事件的默认行为并停止事件冒泡。

```vue
<form @submit.prevent.stop="handleSubmit">提交</form>
```

------

5. **动态绑定事件**

你还可以动态绑定事件，使用对象语法来绑定多个事件或方法。

```vue
<template>
  <button v-on="buttonEvents">点击我</button>
</template>

<script setup>
const buttonEvents = {
  click: () => alert('按钮点击！'),
  mouseover: () => alert('鼠标悬停！')
}
</script>
```

**解释**：

- `v-on="buttonEvents"`：动态绑定对象 `buttonEvents`，包含多个事件。

------

6. **事件修饰符和对象语法组合**

```vue
<template>
  <button @click.stop.prevent="handleClick">点击我</button>
</template>

<script setup>
const handleClick = () => {
  console.log("事件被触发并阻止了默认行为和冒泡");
}
</script>
```

------

🎯 总结

| 特性             | 说明                                       | 示例                             |
| ---------------- | ------------------------------------------ | -------------------------------- |
| **事件绑定**     | 绑定常见的 DOM 事件（如 `click`、`input`） | `@click="increment"`             |
| **事件修饰符**   | 阻止事件冒泡、阻止默认行为等               | `@click.stop`、`@submit.prevent` |
| **事件对象**     | 获取原生事件对象                           | `@click="handleClick($event)"`   |
| **动态绑定事件** | 通过对象语法动态绑定多个事件               | `v-on="buttonEvents"`            |

------



### v-for

`v-for` 是 Vue 中用来 **循环渲染** 列表的指令，常用于动态生成列表、数组或者对象内容。

一、`v-for` 语法

`v-for` 允许你遍历数组、对象或者数字范围，并为每一项渲染出一个 DOM 元素。

```html
v-for="(item, index) in list"
```

- **`item`**：当前循环项（如数组中的每一个元素）。
- **`index`**：当前项的索引，数组中元素的下标。
- **`list`**：你要循环的数组或对象。

语法基本结构：

```html
v-for="(item, index) in items"
```

------

二、常见用法

1. **遍历数组**

```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
const items = ['苹果', '香蕉', '橙子']
</script>
```

**解释**：

- `v-for="(item, index) in items"`：遍历数组 `items`，并把每个元素赋值给 `item`，索引赋值给 `index`。
- `:key="index"`：Vue 推荐为每个列表项加上一个唯一的 `key`，通常使用数组的索引或对象的唯一标识符。这样有助于 Vue 在渲染时追踪每一项。

------

2. **遍历对象**

如果你有一个对象，你也可以用 `v-for` 遍历它的键值对。

```vue
<template>
  <ul>
    <li v-for="(value, key) in user" :key="key">{{ key }}: {{ value }}</li>
  </ul>
</template>

<script setup>
const user = {
  name: 'Tom',
  age: 25,
  location: 'Beijing'
}
</script>
```

**解释**：

- `v-for="(value, key) in user"`：遍历对象 `user`，`key` 为对象的键，`value` 为对应的值。

------

3. **遍历数字范围**

你也可以遍历数字范围，用 `v-for` 生成一定数量的元素。

```vue
<template>
  <ul>
    <li v-for="n in 5" :key="n">Item {{ n }}</li>
  </ul>
</template>
```

**解释**：

- `v-for="n in 5"`：生成 1 到 5 的数字（即 1, 2, 3, 4, 5）。
- Vue 会自动根据 `5` 来生成循环的 5 个 `li` 元素。

------

三、使用 `key`（非常重要）

**`key`** 是 Vue 强烈推荐使用的一个特性。它是一个 **唯一的标识符**，用于优化 Vue 渲染性能，帮助 Vue 更高效地更新视图。

为什么要使用 `key`？

- **提升渲染性能**：`key` 使得 Vue 能够高效地比较新旧 VDOM（虚拟 DOM），从而避免不必要的 DOM 操作。
- **确保组件状态保持**：如果不使用 `key`，在循环中如果数据变动，Vue 可能会重新渲染整个列表，而不是只更新变化的部分。

示例：如果你没有加 `key`：

```vue
<template>
  <ul>
    <li v-for="(item, index) in items">{{ item }}</li>
  </ul>
</template>
```

- 这样写没有 `key`，Vue 在重新渲染时可能不太精确地更新 DOM，可能会导致一些性能问题或不必要的重新渲染。

------

四、`v-for` 与 `v-if` 配合使用

有时你可能需要同时使用 `v-for` 和 `v-if`，比如在循环中根据某些条件渲染项。**但是，建议避免在同一元素上同时使用 `v-for` 和 `v-if`，因为这样 Vue 需要做更多的处理，性能会受到影响**。最好使用 `v-if` 包裹整个 `v-for` 元素。

错误示范：不要这样用

```vue
<li v-for="(item, index) in items" v-if="item.show">{{ item.name }}</li>
```

正确示范：先过滤数据，再渲染

```vue
<template>
  <ul>
    <li v-for="(item, index) in filteredItems" :key="index">{{ item.name }}</li>
  </ul>
</template>

<script setup>
const items = [
  { name: '苹果', show: true },
  { name: '香蕉', show: false },
  { name: '橙子', show: true }
]

const filteredItems = items.filter(item => item.show)
</script>
```

------

五、`v-for` 和 `v-bind` 配合使用

`v-for` 可以和 `v-bind` 结合，动态绑定多个属性或类。

```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" :class="item.class">{{ item.name }}</li>
  </ul>
</template>

<script setup>
const items = [
  { name: '苹果', class: 'red' },
  { name: '香蕉', class: 'yellow' },
  { name: '橙子', class: 'orange' }
]
</script>
```

**解释**：

- `:class="item.class"`：每个列表项的类根据数据 `item.class` 动态绑定。

------

六、`v-for` 嵌套

`v-for` 可以嵌套，适用于渲染复杂的数据结构，如数组中的数组。

```vue
<template>
  <ul>
    <li v-for="(category, index) in categories" :key="index">
      <h3>{{ category.name }}</h3>
      <ul>
        <li v-for="(item, idx) in category.items" :key="idx">{{ item }}</li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
const categories = [
  { name: '水果', items: ['苹果', '香蕉', '橙子'] },
  { name: '蔬菜', items: ['西红柿', '土豆', '菠菜'] }
]
</script>
```

**解释**：

- 外层的 `v-for` 遍历 `categories`，内层的 `v-for` 遍历每个 `category` 下的 `items`。

------

🎯 总结

| 特性                 | `v-for` 用法                                        | 适用场景                             |
| -------------------- | --------------------------------------------------- | ------------------------------------ |
| **遍历数组**         | `v-for="(item, index) in array"`                    | 列表渲染                             |
| **遍历对象**         | `v-for="(value, key) in object"`                    | 渲染对象属性和值                     |
| **遍历数字范围**     | `v-for="n in 5"`                                    | 生成一定数量的 DOM 元素（如 `li`）   |
| **使用 `key`**       | `v-for="(item, index) in list" :key="index"`        | 提升渲染性能，确保组件状态保持       |
| **与 `v-bind` 配合** | `v-for="(item, index) in list" :class="item.class"` | 动态绑定属性（如类名、样式）         |
| **嵌套循环**         | 嵌套多个 `v-for`                                    | 渲染多层结构（如多层级的分类和列表） |

------





### v-if

------

🧠 一句话理解 `v-if`

> `v-if` 会根据条件的真假，**决定是否在 DOM 中渲染某个元素**。
>  条件为 `true`：渲染；为 `false`：直接不生成这个 DOM 节点。

------

✅ 基本语法

```vue
<div v-if="isVisible">我显示了！</div>
```

- 当 `isVisible === true`，这段 `<div>` 才会被渲染；
- 如果为 `false`，**该元素不会出现在 DOM 中**，甚至不渲染。

------

📘 完整示例（Composition API）

```vue
<template>
  <div>
    <button @click="toggle">切换显示</button>
    <p v-if="visible">你好，我是被 v-if 控制的段落</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)

function toggle() {
  visible.value = !visible.value
}
</script>
```

🧠 **点击按钮**，每次会反转 `visible` 的值，从而控制 `<p>` 是否显示。

------

🆚 和 `v-show` 的区别（重点！）

| 特性         | `v-if`                          | `v-show`                                |
| ------------ | ------------------------------- | --------------------------------------- |
| 是否渲染元素 | ❌ 条件为 false 时不渲染         | ✅ 总是渲染，只是用 `display: none` 隐藏 |
| 切换成本     | 高（每次切换都会重新创建/销毁） | 低（只切换 CSS 样式）                   |
| 推荐场景     | 初始不显示，或很少切换          | 频繁显示/隐藏                           |

🔍 **总结**：

- 页面第一次加载就显示/隐藏切换频繁：用 `v-show`；
- 控制某个模块是否“存在”：用 `v-if`。

------

🧩 多条件分支：`v-else-if` 和 `v-else`

你可以像 `if...else if...else` 一样，使用多个条件：

```vue
<template>
  <div>
    <p v-if="type === 'A'">A 类型内容</p>
    <p v-else-if="type === 'B'">B 类型内容</p>
    <p v-else>默认内容</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const type = ref('A')
</script>
```

------

🔐 使用细节和注意事项

1. **必须在相邻元素中使用 `v-else` / `v-else-if`**

   ```vue
   <p v-if="isA">A</p>
   <p v-else>B</p>  ✅ 正确
   
   <div></div>
   <p v-else>B</p>  ❌ 错误，中间隔了元素
   ```

2. **`v-if` 会真正销毁和重建 DOM 节点**

   - 数据、事件监听等都会重新创建。

3. **可用于组件或 HTML 元素**

   ```vue
   <MyComponent v-if="isLogin" />
   ```

------

🛠 实际工作中常见用途

- 登录状态：`v-if="isLoggedIn"` 显示用户信息，未登录显示登录按钮。
- 权限控制：`v-if="user.isAdmin"` 显示管理按钮。
- 弹窗/模态框：用 `v-if` 控制是否挂载在页面上。
- 表单错误提示：`v-if="errorMessage"` 显示错误信息。

------

🧠 总结

| 特性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| `v-if`           | 根据条件决定是否“渲染” DOM                                   |
| `v-else-if`      | 条件链式分支判断                                             |
| `v-else`         | 条件都不满足时的兜底内容                                     |
| 与 `v-show` 区别 | `v-if` 是**真正的添加/删除元素**，`v-show` 是**切换 display** |
| 适用场景         | 控制是否生成 DOM，尤其适合**少量切换、初始化加载控制**       |

------



### v-show

🧠 一句话理解 `v-show`

> `v-show` 根据布尔值来**控制元素的 CSS 显示状态**，实际上是切换 `display: none` 或 `display: block`。

- `v-show="true"` → 元素可见
- `v-show="false"` → 元素不可见（但仍然在 DOM 中，只是隐藏）

------

✅ 基本语法

```vue
<p v-show="isVisible">我会被显示或隐藏</p>
```

- 当 `isVisible` 为 `false`，这段 `<p>` 仍存在于 DOM 中，但它的样式会变成：

```html
<p style="display: none;">我会被显示或隐藏</p>
```

------

🎯 示例：切换显示状态

```vue
<template>
  <div>
    <button @click="toggle">切换显示</button>
    <p v-show="visible">我是 v-show 控制的段落</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(true)

function toggle() {
  visible.value = !visible.value
}
</script>
```

📌 运行效果：每次点击按钮，`<p>` 会在显示与隐藏之间切换，但它**始终存在于 DOM 中**。

------

🆚 `v-if` vs `v-show` 对比总结

| 特性         | `v-if`                         | `v-show`                          |
| ------------ | ------------------------------ | --------------------------------- |
| 控制方式     | DOM 创建 / 销毁                | CSS 显示隐藏（`display: none`）   |
| 初始渲染成本 | 高（需要判断并渲染或销毁 DOM） | 低（所有元素一开始就渲染了）      |
| 切换性能     | 慢（每次切换都创建/销毁元素）  | 快（只切换 CSS）                  |
| 使用场景     | 条件不常变，或初次加载控制     | 条件频繁切换，如 tab、展开/折叠等 |
| 是否销毁元素 | 是（不显示时 DOM 会移除）      | 否（始终在 DOM 中，只是隐藏了）   |

------

🧩 实际开发中怎么选？

| 场景                                  | 建议使用   |
| ------------------------------------- | ---------- |
| 初次加载时根据条件是否渲染            | `v-if`     |
| 切换内容频繁（如菜单、tab、开关等）   | ✅ `v-show` |
| 需要 DOM 不被销毁（比如保留组件状态） | ✅ `v-show` |
| 控制是否展示整块结构（如权限判断）    | ✅ `v-if`   |

------

📦 进阶：v-show 组件 + 动画支持

虽然 `v-show` 不能配合 Vue 的 `<transition>` 实现“进入/离开”动画（因为它不销毁元素），但你可以给它添加过渡类名 + CSS 动画。

```vue
<template>
  <div>
    <button @click="toggle">切换菜单</button>
    <div v-show="visible" class="fade">我是菜单</div>
  </div>
</template>

<style scoped>
.fade {
  transition: opacity 0.5s ease;
  opacity: 1;
}
.fade[style*="display: none"] {
  opacity: 0;
}
</style>

<script setup>
import { ref } from 'vue'
const visible = ref(true)
const toggle = () => (visible.value = !visible.value)
</script>
```

------

✅ 总结一句话

- `v-show` 是一种**高性能、轻量级的“显示控制”**方式；
- 不销毁元素，只是控制显示；
- 适合用在 **频繁切换显示状态的场景**！

------



### v-model

------

🧠 一句话理解 `v-model`

> `v-model` 是用来实现 **双向数据绑定** 的指令，**让数据和视图保持同步**。

简单来说：你输入一个值 → 数据变了；你改变数据 → 输入框也自动更新。

------

✅ 基本语法

```vue
<input v-model="message" />
<p>{{ message }}</p>
```

当你在输入框中输入文字，Vue 会自动把输入的值更新到变量 `message`，并且页面上绑定 `{{ message }}` 的地方也会自动更新 —— 这就是**双向绑定**。

------

📘 基本示例（Composition API）

```vue
<template>
  <input v-model="name" placeholder="请输入你的名字" />
  <p>你好，{{ name }}</p>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
</script>
```

- `v-model="name"`：把 `<input>` 的值和 `name` 变量绑定。
- 当你修改 `name` 变量，输入框值会变；当你输入内容，`name` 变量也会变。

------

🔧 适用场景

| 使用场景   | 元素类型                       | 示例                 |
| ---------- | ------------------------------ | -------------------- |
| 文本输入框 | `<input type="text">`          | `v-model="username"` |
| 文本区域   | `<textarea>`                   | `v-model="bio"`      |
| 单选按钮   | `<input type="radio">`         | `v-model="gender"`   |
| 多选框     | `<input type="checkbox">`      | `v-model="agree"`    |
| 下拉选择   | `<select>`                     | `v-model="city"`     |
| 组件间绑定 | 自定义组件（`props` + `emit`） | 高阶用法后面讲解     |

------

📦 示例：checkbox 和 radio 的 `v-model`

1. **单选按钮（radio）**

```vue
<input type="radio" value="男" v-model="gender" /> 男
<input type="radio" value="女" v-model="gender" /> 女
<p>你选择的是：{{ gender }}</p>

<script setup>
const gender = ref('')
</script>
```

------

2. **多选框（checkbox）绑定布尔值**

```vue
<input type="checkbox" v-model="agree" /> 同意条款
<p>{{ agree ? '已同意' : '未同意' }}</p>

<script setup>
const agree = ref(false)
</script>
```

------

3. **多选框绑定数组（多个选择项）**

```vue
<input type="checkbox" value="Vue" v-model="likes" /> Vue
<input type="checkbox" value="React" v-model="likes" /> React
<input type="checkbox" value="Angular" v-model="likes" /> Angular
<p>你喜欢的框架有：{{ likes.join(', ') }}</p>

<script setup>
const likes = ref([])
</script>
```

------

🧠 `v-model` 的原理

- 等价于：

  ```vue
  <input :value="message" @input="message = $event.target.value" />
  ```

所以：

- `v-model` 是 `:value`（绑定值）+ `@input`（更新值）的语法糖。
- 对于 `<select>`、`<input type="checkbox">`、`<input type="radio">` 会做额外处理。

------

🔄 v-model 是响应式的吗？

是的！你用 `ref()` 定义的变量（如 `message`, `name`, `likes`）都是响应式的，**修改会自动更新 DOM，DOM 变化也会更新数据**。

------

⚠️ 注意事项

1. `v-model` 只能绑定到响应式变量（ref/reactive 定义的）
2. 使用 `<script setup>` 时，直接用 `ref()` 创建即可
3. 不要和 `:value`、`@input` 混用，避免冲突除非你知道自己在干什么

------

🚀 总结

| 特性       | 描述                                       |
| ---------- | ------------------------------------------ |
| 功能       | 双向数据绑定                               |
| 本质       | `:value` + `@input` 的语法糖               |
| 适用场景   | 表单输入、选项选择、组件传值等             |
| 类型支持   | text、textarea、radio、checkbox、select 等 |
| 响应式支持 | ✅ 与 `ref()` / `reactive()` 联动更新       |

------



### class/style动态绑定

🎨 一、动态 `class` 绑定

Vue 提供两种主要方式绑定 `class`：

------

✅ 1. 绑定字符串（最简单）

```vue
<p :class="className">Hello</p>
const className = ref('highlight')
```

✅ 结果：渲染成：

```html
<p class="highlight">Hello</p>
```

------

✅ 2. 绑定对象

Vue 会**根据对象中每个 key（类名）对应的 value（布尔值）是否为真**，来决定是否给元素添加这个 class。

用对象可以**动态决定哪些类名要不要加**，非常常用：

```vue
<p :class="{ active: isActive, error: hasError }">
  状态信息
</p>
const isActive = ref(true)
const hasError = ref(false)
```

✅ 结果：

- `active` 为 `true` → 会加上 `active` 类
- `error` 为 `false` → 不会加上 `error` 类

渲染：

```html
<p class="active">状态信息</p>
```

------

✅ 3. 绑定数组

当你需要同时应用多个类时，用数组很方便：

```vue
<p :class="[primaryClass, secondaryClass]">多类示例</p>
const primaryClass = ref('highlight')
const secondaryClass = ref('bold')
```

✅ 渲染：

```html
<p class="highlight bold">多类示例</p>
```

------

🔄 小技巧

**数组和对象可以组合：**

```vue
<p :class="[baseClass, { active: isActive, error: hasError }]"></p>
```

------

🎨 二、动态 `style` 绑定

动态绑定行内样式，也有多种写法：

------

✅ 1. 绑定对象

最常用：直接对象写法：

```vue
<p :style="{ color: textColor, fontSize: fontSize + 'px' }">
  动态样式
</p>
const textColor = ref('red')
const fontSize = ref(20)
```

✅ 渲染：

```html
<p style="color: red; font-size: 20px;">动态样式</p>
```

------

✅ 2. 绑定数组

可以绑定多个样式对象：

```vue
<p :style="[baseStyle, overrideStyle]">多样式</p>
const baseStyle = ref({ color: 'blue', fontSize: '14px' })
const overrideStyle = ref({ fontWeight: 'bold' })
```

✅ 渲染：

```html
<p style="color: blue; font-size: 14px; font-weight: bold;">多样式</p>
```

------

🧩 实际例子：完整演示

这里给你一个最典型的例子（你可以直接粘贴进 `.vue` 文件）：

```vue
<template>
  <div>
    <h2 :class="{ active: isActive, error: hasError }">
      动态 class 示例
    </h2>
    <button @click="toggle">切换状态</button>

    <p :style="styleObject">
      动态 style 示例
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

function toggle() {
  isActive.value = !isActive.value
  hasError.value = !hasError.value
}

const styleObject = ref({
  color: 'green',
  fontSize: '18px'
})
</script>

<style scoped>
.active {
  background: #e0ffe0;
}
.error {
  border: 1px solid red;
}
</style>
```

✅ 效果：

- 点击按钮切换 `active` 和 `error` 类
- `styleObject` 控制行内样式

------

✨ 总结对比表

| 功能   | class                          | style                       |
| ------ | ------------------------------ | --------------------------- |
| 字符串 | `:class="'classname'"`         | 不适用                      |
| 对象   | `:class="{a: true, b: false}"` | `:style="{ color: 'red' }"` |
| 数组   | `:class="[a, b]"`              | `:style="[style1, style2]"` |

------



## computed&watch

------

🧠 一句话理解

| 工具       | 用途                                | 核心特点                                 |
| ---------- | ----------------------------------- | ---------------------------------------- |
| `computed` | 用于 **基于已有数据计算新的值**     | 自动缓存，只有依赖变了才重新计算         |
| `watch`    | 用于 **监听数据变化执行副作用逻辑** | 适合处理异步请求、手动操作、定时器等行为 |

------

✨ 一、`computed` —— 计算属性

✅ 用途：

- 基于已有响应式数据 **派生出新的数据**。
- 模板中常用来渲染数据。

------

📦 示例：根据两个数自动计算和

```vue
<template>
  <div>
    <input type="number" v-model="a" />
    <input type="number" v-model="b" />
    <p>两数之和是：{{ sum }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const a = ref(0)
const b = ref(0)

const sum = computed(() => a.value + b.value)
</script>
```

✅ `sum` 是一个 **自动根据 `a` 和 `b` 更新的只读变量**。

------

✅ 特点总结：

| 特点             | 描述                             |
| ---------------- | -------------------------------- |
| 自动依赖收集     | Vue 会追踪它访问了哪些响应式变量 |
| 有缓存           | 如果依赖没变，**不会重新计算**   |
| 用于模板非常高效 | 推荐用在 `template` 中           |

------

✨ 二、`watch` —— 监听变化做副作用

✅ 用途：

- **监听某个值的变化，做副作用操作**：如 API 请求、写日志、本地缓存、倒计时等。

------

📦 示例：监听输入变化，打印日志

```vue
<template>
  <input v-model="name" />
</template>

<script setup>
import { ref, watch } from 'vue'

const name = ref('')

watch(name, (newVal, oldVal) => {
  console.log(`名字变化了：从 "${oldVal}" 到 "${newVal}"`)
})
</script>
```

🧠 每次 `name` 发生变化，都会执行 `watch` 里的回调。

------

📦 高阶示例：监听多个值

```js
watch([a, b], ([newA, newB], [oldA, oldB]) => {
  console.log('a或b变化了', newA, newB)
})
```

------

📦 watch + async 示例（典型用法）

```vue
<script setup>
import { ref, watch } from 'vue'

const keyword = ref('')
const result = ref('')

watch(keyword, async (newKeyword) => {
  if (!newKeyword) return
  const res = await fetch(`https://api.example.com/search?q=${newKeyword}`)
  const data = await res.json()
  result.value = data.result
})
</script>
```

🧠 每次 `keyword` 改变后，自动请求搜索接口。

------

✅ 特点总结：

| 特点           | 描述                                 |
| -------------- | ------------------------------------ |
| 适合执行副作用 | 异步请求、定时器、事件绑定等行为     |
| 可以监听多个值 | `[a, b]` 或 `reactive对象中的某属性` |
| 支持选项控制   | `immediate`、`deep` 等高级选项       |

------

🔄 `computed` vs `watch` 对比总结

| 对比点       | `computed`                      | `watch`                                     |
| ------------ | ------------------------------- | ------------------------------------------- |
| 用途         | 派生新值，展示                  | 执行副作用（网络请求、保存、日志等）        |
| 返回值       | 计算后的值（常用于模板）        | 无返回值，只执行回调                        |
| 是否缓存     | ✅ 是                            | ❌ 否，每次变化都触发                        |
| 推荐使用场景 | 模板渲染、表单派生、组合逻辑    | 监听变化、异步请求、定时器/清理等副作用处理 |
| 写法         | `const x = computed(() => ...)` | `watch(source, callback)`                   |

------







## 生命周期钩子

🌱 一、生命周期钩子的基本概念

Vue 的生命周期钩子函数是你在组件的不同生命周期阶段可以调用的函数。每个组件从创建到销毁的过程可以分为几个阶段：**创建**、**挂载**、**更新**、**销毁**。在这些阶段，Vue 会自动调用相应的生命周期钩子函数，让你能够在合适的时机执行一些操作。

------

🧩 二、Vue 3 的生命周期钩子

Vue 3 在生命周期钩子中加入了 Composition API，`Vue.component` 方法用于注册组件。在使用 `Vue.component` 注册组件时，生命周期钩子通常会在这些钩子中执行。

------

**1. 创建阶段：**

- `beforeCreate` 和 `created`

`beforeCreate` 和 `created` 是 Vue 实例的创建阶段，用来初始化数据、事件和生命周期方法。

- **`beforeCreate`**：实例创建后，但数据和事件等都未设置时调用。
- **`created`**：实例创建后，数据、计算属性等初始化完成时调用。

示例：组件注册并使用生命周期钩子

```js
Vue.component('my-component', {
  data() {
    return {
      message: 'Hello Vue 3'
    }
  },
  created() {
    console.log('组件已创建，message 是：', this.message)
  },
  beforeCreate() {
    console.log('组件实例化之前，message 是：', this.message)
  },
  template: `<p>{{ message }}</p>`
});
```

- **解释**：组件在创建时会触发 `beforeCreate` 和 `created` 钩子。
  - 在 `beforeCreate` 中，`message` 数据还没有初始化。
  - 在 `created` 中，`message` 数据已经初始化。

------

**2. 挂载阶段：**

- `beforeMount` 和 `mounted`

`beforeMount` 和 `mounted` 用来在 Vue 实例挂载前后执行操作，通常用于进行 DOM 操作或初始化第三方库。

- **`beforeMount`**：在挂载开始之前调用，模板编译还没有开始。
- **`mounted`**：Vue 实例挂载到 DOM 上后调用，模板已经编译成真实的 DOM。

示例：组件挂载时执行的操作

```js
Vue.component('my-component', {
  data() {
    return {
      message: 'Vue 3 Lifecycle'
    }
  },
  beforeMount() {
    console.log('组件即将挂载');
  },
  mounted() {
    console.log('组件已挂载');
  },
  template: `<h1>{{ message }}</h1>`
});
```

- **解释**：`beforeMount` 会在组件渲染之前执行，`mounted` 会在组件挂载后执行。`mounted` 是你可以访问到组件真实 DOM 的时机。

------

**3. 更新阶段：**

- `beforeUpdate` 和 `updated`

当数据发生变化时，Vue 会重新渲染组件。`beforeUpdate` 和 `updated` 可以让你在数据变化时执行操作。

- **`beforeUpdate`**：数据发生变化时，虚拟 DOM 更新前调用，尚未更新 DOM。
- **`updated`**：数据变化后，虚拟 DOM 更新并反映到 DOM 后调用。

示例：数据更新时的钩子函数

```js
Vue.component('my-component', {
  data() {
    return {
      message: 'Initial Message'
    }
  },
  beforeUpdate() {
    console.log('数据即将更新，当前 message 是：', this.message)
  },
  updated() {
    console.log('数据更新完成，当前 message 是：', this.message)
  },
  methods: {
    updateMessage() {
      this.message = 'Updated Message';
    }
  },
  template: `<div><p>{{ message }}</p><button @click="updateMessage">Update</button></div>`
});
```

- **解释**：`beforeUpdate` 会在数据更新前触发，`updated` 会在数据更新后触发。

------

**4. 销毁阶段：**

- `beforeUnmount` 和 `unmounted`

当组件销毁时，`beforeUnmount` 和 `unmounted` 钩子可以帮助你进行清理操作。

- **`beforeUnmount`**：在组件销毁前调用，通常用于清理定时器、事件监听等资源。
- **`unmounted`**：组件销毁后调用，通常用于进一步清理资源。

示例：组件销毁时的清理操作

```js
Vue.component('my-component', {
  data() {
    return {
      message: 'Component to be destroyed'
    }
  },
  beforeUnmount() {
    console.log('组件即将销毁');
  },
  unmounted() {
    console.log('组件已销毁');
  },
  template: `<p>{{ message }}</p>`
});
```

- **解释**：`beforeUnmount` 会在组件销毁前调用，`unmounted` 会在组件销毁后调用。

------

🏆 **总结：Vue 3 生命周期钩子与 `Vue.component`**

| 生命周期钩子    | 作用                                   | 适用场景                                   |
| --------------- | -------------------------------------- | ------------------------------------------ |
| `beforeCreate`  | 实例化后、数据和事件未初始化时调用     | 很少用，用于实例化前的准备工作             |
| `created`       | 实例化后，数据和事件初始化完成后调用   | 初始化数据、API 请求、事件监听等           |
| `beforeMount`   | 模板挂载之前，数据已渲染但未实际挂载   | 用于准备挂载前的工作，比如准备外部资源     |
| `mounted`       | 模板挂载后，DOM 可访问时调用           | 初始化第三方插件、操作 DOM、获取元素位置等 |
| `beforeUpdate`  | 数据变化时，虚拟 DOM 更新之前调用      | 数据更新前的准备工作，例如获取旧数据       |
| `updated`       | 数据变化后，DOM 更新完成后调用         | 数据更新后的操作，如滚动、重绘等           |
| `beforeUnmount` | 组件销毁前，清理定时器、事件监听等资源 | 清理操作，如销毁定时器、注销事件等         |
| `unmounted`     | 组件销毁后，进一步清理操作             | 组件销毁后进一步清理资源                   |

------

💡 小结

- 在实际开发中，**创建阶段**（`created`）通常用来进行 **数据初始化** 和 **API 请求**。
- **挂载阶段**（`mounted`）适合用来进行 **DOM 操作** 或 **第三方库初始化**。
- **更新阶段**（`beforeUpdate` 和 `updated`）适用于 **响应数据变化**，例如在数据更新后执行一些 DOM 操作。
- **销毁阶段**（`beforeUnmount` 和 `unmounted`）可以用来清理定时器、事件监听器、外部库等资源。





## 模板引用

> **模板引用** 是 Vue 提供的一种机制，可以让你通过 `ref` 属性，在 JavaScript 中直接访问 DOM 元素或子组件的实例。

------

🔧 基本语法

在模板中给某个元素或组件加上 `ref="名字"`，在代码中通过 `this.$refs.名字` 或 `ref(名字)`（setup 语法中）访问。

✨ 在选项式 API（`Vue.component`）中：

```html
<template>
  <input ref="myInput" />
  <button @click="focusInput">聚焦</button>
</template>

<script>
export default {
  methods: {
    focusInput() {
      this.$refs.myInput.focus(); // 访问 DOM 并调用原生 focus()
    }
  }
}
</script>
```

✨ 在组合式 API（`<script setup>`）中：

```vue
<template>
  <input ref="myInput" />
  <button @click="focusInput">聚焦</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const myInput = ref(null)

function focusInput() {
  myInput.value.focus()
}
</script>
```

------

🔍 应用场景一：访问原生 DOM 元素

当你需要对一个原生 DOM 元素进行：

- 聚焦（如 input）
- 滚动（如 div）
- 获取高度/宽度等

**模板引用就是你的首选！**

当然！下面是**使用 Vue 3 中 `<script setup>` 语法糖的版本**，实现：点击按钮后让输入框获得焦点，访问的是**原生 DOM 元素**。

------

✅ 示例：`<script setup>` + 模板引用 + DOM 操作

```vue
<template>
  <div>
    <h2>请输入内容：</h2>
    <input ref="inputEl" placeholder="点按钮后我会被聚焦" />
    <button @click="focusInput">点我聚焦输入框</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 创建模板引用变量
const inputEl = ref(null)

// 通过模板引用访问 DOM 并聚焦
function focusInput() {
  inputEl.value.focus()
}
</script>

<style scoped>
input {
  padding: 6px;
  font-size: 16px;
}
button {
  margin-top: 8px;
  padding: 6px 12px;
  font-size: 16px;
}
</style>
```

------

🧠 解释：

| 部分                    | 作用说明                                                    |
| ----------------------- | ----------------------------------------------------------- |
| `ref(null)`             | 初始化一个空引用，Vue 会在 DOM 渲染后赋值                   |
| `ref="inputEl"`         | 绑定 DOM 元素，Vue 渲染后自动设置 `inputEl.value = DOM元素` |
| `inputEl.value.focus()` | 访问原生 DOM 的方法，聚焦输入框                             |

------

📌 注意点：

- **模板中 `ref="xxx"` 一定要和 `ref()` 定义的变量名字一致**。
- **必须等 DOM 渲染完成后再访问**，Vue 会自动确保这一点，所以不用担心。

------

你可以把这个组件放进你当前项目的 `components/` 文件夹中，然后在 `App.vue` 中导入并使用它：

```vue
<script setup>
import FocusInput from './components/FocusInput.vue'
</script>

<template>
  <FocusInput />
</template>
```

------

如果你想尝试访问多个 DOM 元素，或子组件实例，我也可以扩展这个例子，继续讲下去，随时告诉我 👍

------

🧩 应用场景二：访问子组件实例

你也可以给**子组件**加 `ref`，从而在父组件中直接调用子组件的方法或访问其数据。

示例：调用子组件方法

子组件 `MyChild.vue`

```vue
<template>
  <p>我是子组件</p>
</template>

<script>
export default {
  methods: {
    sayHello() {
      alert('Hello from Child!');
    }
  }
}
</script>
```

父组件中使用：

```vue
<template>
  <MyChild ref="child" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script>
import MyChild from './MyChild.vue'

export default {
  components: { MyChild },
  methods: {
    callChildMethod() {
      this.$refs.child.sayHello(); // 调用子组件中的方法
    }
  }
}
</script>
```

------

✅ 使用规则和注意事项

| 规则 / 注意点                         | 说明                                                   |
| ------------------------------------- | ------------------------------------------------------ |
| `ref` 属性只能用于 DOM 元素或组件     | 对 `<div>`、`<input>`、自定义组件都有效                |
| **访问时机**：要在 `mounted` 之后访问 | 因为 DOM 必须挂载后才能访问                            |
| 使用 `$refs` 是非响应式的             | 它不会响应式更新，也就是说 Vue 不会追踪 `$refs` 的变化 |
| 在组合式 API 中，用 `ref()` 接收      | 即使是 DOM 也用 `ref(null)` 初始化                     |

------

🎯 总结

| 使用场景       | 代码             | 说明                       |
| -------------- | ---------------- | -------------------------- |
| DOM 操作       | `ref="inputBox"` | 操作 input、div 等元素     |
| 组件实例访问   | `ref="myChild"`  | 调用组件方法、访问组件数据 |
| 必须在 mounted | 生命周期内使用   | DOM 渲染完成后才能使用     |

------





## 组件注册

在 Vue 3 的 `<script setup>` 中：

> ✅ 只要你 `import` 了组件，就已经“注册”了它，**不需要再手动写 `components` 配置**

------

✅ 一、组件注册流程（完整示例）

1️⃣ 建一个子组件：`MyButton.vue`

```vue
<!-- src/components/MyButton.vue -->
<template>
  <button class="btn">点击我</button>
</template>

<script setup>
// 不需要写 name，不需要写 export
</script>

<style scoped>
.btn {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

------

2️⃣ 在父组件中使用：`App.vue` 或 `Parent.vue`

```vue
<!-- src/App.vue 或 src/views/Parent.vue -->
<template>
  <MyButton />
</template>

<script setup>
import MyButton from './components/MyButton.vue' // ✅ 只要导入，就可以在模板里用
</script>
```

就是这么简单！这就叫做**自动组件注册**，是 Vue 3 + `<script setup>` 的默认行为。

------

✅ 二、你能用的写法总结：

| 用法                                         | 是否需要写 `components`            | 是否推荐     |
| -------------------------------------------- | ---------------------------------- | ------------ |
| `<script setup>` + `import`                  | ❌ 不需要                           | ✅ 强烈推荐   |
| `<script setup>` + `defineOptions({ name })` | ❌ 不影响注册，只用于 `name` 元信息 | ⚙️ 有需要再加 |

------

❗ 三、几点注意事项

| 注意点                                     | 说明                                 |
| ------------------------------------------ | ------------------------------------ |
| 文件名和组件名可以不一致                   | 但建议保持一致，维护更清晰           |
| 模板中使用的标签名由 `import` 的变量名决定 | 所以 `import Xxx` 就写 `<Xxx />`     |
| `<script setup>` 不能写 `export default`   | 会报错，因为它是语法糖，自动处理导出 |

------





## props

**`props` 是 Vue 中用来让父组件向子组件传递数据的机制。**

可以类比成函数的参数，只不过是**组件之间的数据传递**。

------

✅ 用一句话总结：

> 父组件把数据“传下去”，子组件用 `props` 接收。

------

🧱 一个最简单的例子

1️⃣ 父组件（App.vue）

```vue
<template>
  <HelloMessage name="suki" />
</template>

<script setup>
import HelloMessage from './components/HelloMessage.vue'
</script>
```

2️⃣ 子组件（HelloMessage.vue）

```vue
<script setup>
defineProps(['name'])  // 接收 name 这个 prop
</script>

<template>
  <p>你好，{{ name }}！</p>
</template>
```

------

🔧 props 是怎么工作的？

在 Vue 组件中：

- 父组件中：`<子组件名 prop名称="值">`
- 子组件中：`defineProps()` 来声明它能接收哪些 prop

------

💡 defineProps 用法详解（Vue 3 专用）

✅ 最简写法（只列 prop 名字）

```js
defineProps(['title', 'age'])
```

✅ 完整写法（带类型和默认值）

```js
defineProps({
  title: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  }
})
```

------

🧪 常见类型支持

| 类型     | 写法          |
| -------- | ------------- |
| 字符串   | `String`      |
| 数字     | `Number`      |
| 布尔值   | `Boolean`     |
| 数组     | `Array`       |
| 对象     | `Object`      |
| 函数     | `Function`    |
| 自定义类 | `CustomClass` |

------

❗ 注意事项

| 注意点           | 说明                        |
| ---------------- | --------------------------- |
| props 是单向的   | 父 → 子，子不能直接改 props |
| 子组件要修改值？ | 用 `emit` 通知父组件        |
| props 可以传对象 | 完全可以，适合传多个字段    |

------

🛠 实际例子：有一个商品列表（父组件），每个商品是一个子组件，子组件通过按钮可以通知父组件“加入购物车”。

👨‍👩‍👧 父组件

```vue
<!-- src/App.vue -->
<script setup>
import ProductCard from './components/ProductCard.vue'
import { ref } from 'vue'

const products = [
  { title: '苹果', price: 3 },
  { title: '香蕉', price: 2 },
  { title: '西瓜', price: 8 }
]

const cart = ref([])

function handleAddToCart(item) {
  cart.value.push(item)
  console.log('购物车商品：', cart.value)
}
</script>

<template>
  <h1>商品列表</h1>
  <ProductCard
    v-for="(product, index) in products"
    :key="index"
    :title="product.title"
    :price="product.price"
    @addToCart="handleAddToCart"
  />

  <hr />
  <h2>🛒 购物车</h2>
  <ul>
    <li v-for="(item, index) in cart" :key="index">
      {{ item.title }} - ￥{{ item.price }}
    </li>
  </ul>
</template>

```

🧒 子组件

```vue
<!-- src/components/ProductCard.vue -->
<script setup>
const props = defineProps({
  title: String,
  price: Number
})

const emit = defineEmits(['addToCart'])

function handleAddClick() {
  emit('addToCart', { title: props.title, price: props.price })
}
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>价格：￥{{ price }}</p>
    <button @click="handleAddClick">加入购物车</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 12px;
  margin: 8px;
  border-radius: 6px;
}
</style>

```

------

| 功能       | 技术实现                                                     |
| ---------- | ------------------------------------------------------------ |
| 父传子     | 父组件通过 `:title="..."` `:price="..."` 使用 `props` 传递数据 |
| 子接收     | 子组件使用 `defineProps` 接收                                |
| 子通知父   | 子组件用 `emit('addToCart', 数据)` 通知父组件                |
| 父响应事件 | 父组件通过 `@addToCart="handleAddToCart"` 来接收事件和数据   |



🎯 总结重点

| 要点             | 解释                                     |
| ---------------- | ---------------------------------------- |
| `props` 是干嘛的 | 父组件向子组件传值                       |
| 如何使用         | 父传：标签上传值；子收：用 `defineProps` |
| 是否能修改       | ❌ 不可以修改，Vue 会警告                 |
| 类型校验         | 使用 `defineProps({ prop: { type } })`   |
| 是否支持默认值   | ✅ 使用 `default` 设置                    |

------



## attribute继承

在 Vue 中，**attribute 继承** 是指，**父组件传递给子组件的 HTML 原生属性（如 `class`, `style`, `title` 等）会自动添加到子组件的根元素上**，即使子组件并没有显式接收这些属性。

假设我们有这样一个父组件和子组件：

父组件 `Parent.vue`

```vue
<template>
  <MyButton class="btn" title="这是一个按钮" />
</template>

<script setup>
import MyButton from './MyButton.vue';
</script>
```

子组件 `MyButton.vue`

```vue
<template>
  <button>点击我</button>
</template>

<script setup>
// 不需要显式接收 `class` 和 `title`，它们会自动继承到 `button` 元素上
</script>
```

💡 **自动继承**：

在上述代码中，父组件传递的 `class="btn"` 和 `title="这是一个按钮"` 会自动添加到子组件 `MyButton` 中的 `<button>` 元素上。渲染出的 HTML 会是：

```html
<button class="btn" title="这是一个按钮">点击我</button>
```

这种行为是由 Vue 自动处理的，无需显式声明 `props` 或其他接收属性的代码。

------

🔧 Vue 的自动继承规则

1. **自动继承的属性**：
   - HTML 原生属性：如 `class`, `style`, `title`, `id` 等
   - 事件监听器：如 `@click`, `@input` 等
   - 使用 `v-bind` 绑定的属性
2. **不自动继承的属性**：
   - 如果你在子组件的 `props` 中显式声明了一个属性，**该属性不会被自动继承**。
   - 这些属性必须通过 `props` 明确接收，或者通过 `$attrs` 手动访问。

------

⚙️ 通过 `inheritAttrs: false` 控制继承行为

什么是 `inheritAttrs: false`？

`inheritAttrs: false` 是 Vue 提供的一种机制，用来禁止父组件的属性自动继承到子组件的根元素上。这样，你可以完全控制如何将属性应用到子组件的元素上。

示例：禁止自动继承属性

假设你有一个 `MyButton.vue` 组件：

```vue
<template>
  <div class="button-wrapper">
    <button v-bind="$attrs">点击我</button> <!-- 手动绑定所有继承属性 -->
  </div>
</template>

<script setup>
// 不需要显式声明 props
defineProps();
</script>

<script>
export default {
  inheritAttrs: false // 禁止自动将属性继承到根元素
}
</script>
```

在父组件中使用：

```vue
<template>
  <MyButton class="btn" title="这是一个按钮" />
</template>
```

这样，父组件传递的 `class="btn"` 和 `title="这是一个按钮"` 不会自动加到子组件的 `<div>` 上，而是通过 `v-bind="$attrs"` 显式传递到 `<button>` 元素上。

💡 为什么需要 `inheritAttrs: false`？

- 你可能不希望父组件传递的属性直接污染子组件的根元素，尤其是在封装组件时。
- 你想要手动控制属性，决定它们应该应用在哪个 DOM 元素上。

------

🧩 使用 `$attrs` 手动处理继承的属性

如果你使用了 `inheritAttrs: false`，那么 **所有的继承属性**（父组件传递的 HTML 属性）都被包含在 `$attrs` 对象中。你可以通过 `v-bind="$attrs"` 手动绑定这些属性到任何你想要的元素上。

示例：使用 `$attrs` 手动传递属性

```vue
<template>
  <div class="input-wrapper">
    <!-- 手动绑定所有继承的属性 -->
    <input v-bind="$attrs" />
  </div>
</template>

<script setup>
defineProps(); // 不需要显式声明传递的属性
</script>

<script>
export default {
  inheritAttrs: false
}
</script>
```

父组件传递的属性 `class`、`placeholder` 等会通过 `$attrs` 被传递到 `<input>` 元素，而不是传递到根 `div` 元素。

------

🧠 总结

1. **默认行为**：Vue 会自动继承父组件传递的属性到子组件的根元素。
2. **手动控制**：使用 `inheritAttrs: false` 禁止自动继承，并使用 `$attrs` 手动绑定这些属性到其他元素上。
3. **常用场景**：
   - **封装通用组件**：比如封装一个按钮组件，你可能不想让 `class` 或 `style` 影响到外部包装元素。
   - **组件隔离**：确保外部传入的属性只影响组件内的特定元素，而不是整个组件结构。



## 具名插槽

在 Vue 中，**具名插槽（Named Slots）** 是插槽的一种高级用法，可以让你在父组件中 **指定插入内容的位置**，而不是简单的将内容插入到默认插槽中。

具名插槽允许我们在组件模板中定义多个插槽，并且在父组件中指定**不同内容**插入到不同的位置。这对于组件更加灵活和可复用非常重要。

------

🎯 什么是具名插槽？

具名插槽就是给插槽起一个名字，然后在父组件中通过插槽名称来传递内容，从而指定内容插入的具体位置。

📌 语法

- **子组件**：通过 `slot` 标签给插槽命名。
- **父组件**：通过 `v-slot:name` 来指定插入的内容。

------

🔧 基本示例

1. 在子组件中定义具名插槽

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h1>这是一个子组件</h1>
    <slot name="header"></slot> <!-- 具名插槽 header -->
    <p>一些默认的内容</p>
    <slot></slot> <!-- 默认插槽 -->
  </div>
</template>
```

2. 在父组件中插入内容

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent>
    <template v-slot:header>
      <h2>这是来自父组件的 header 内容</h2>
    </template>
    <template v-slot>
      <p>这是默认插槽的内容</p>
    </template>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>
```

渲染结果

```html
<div>
  <h1>这是一个子组件</h1>
  <h2>这是来自父组件的 header 内容</h2>
  <p>一些默认的内容</p>
  <p>这是默认插槽的内容</p>
</div>
```

在这个例子中：

- **`<slot name="header"></slot>`** 定义了一个具名插槽，父组件通过 `<template v-slot:header>` 来指定内容。
- 默认插槽通过 `v-slot` 来传递内容，父组件的内容会插入到子组件的默认插槽位置。

------

⚙️ `v-slot` 用法

1. 简单语法（父组件中插槽内容）

```vue
<ChildComponent>
  <template v-slot:header>
    <h2>这是来自父组件的 header 内容</h2>
  </template>
  <template v-slot>
    <p>这是默认插槽的内容</p>
  </template>
</ChildComponent>
```

- `v-slot:header` 对应子组件中具名为 `header` 的插槽。
- 默认插槽使用 `v-slot` 即可。

2. 带作用域的插槽

有时你希望父组件通过插槽**访问子组件的数据**，这种情况下你需要使用作用域插槽。作用域插槽允许父组件访问子组件的数据并传递给插槽内容。

示例：作用域插槽

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <slot :message="message"></slot> <!-- 传递作用域数据 -->
  </div>
</template>

<script setup>
const message = "这是从子组件传递的数据";
</script>
```

在父组件中，我们可以通过 `v-slot` 访问这些数据：

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent v-slot:default="slotProps">
    <p>子组件传递的数据是：{{ slotProps.message }}</p>
  </ChildComponent>
</template>
```

这里，父组件可以通过 `slotProps.message` 来访问子组件传递的 `message` 数据。

------

💡 作用域插槽的好处

1. **提高灵活性**：子组件可以暴露一些数据或行为给父组件，使得父组件能够更灵活地使用子组件。
2. **组件解耦**：父组件不需要知道子组件的实现细节，只通过插槽来使用子组件的数据。

------

🧩 多个具名插槽

Vue 支持在同一个组件中使用多个具名插槽。例如，一个组件可以有多个部分，比如头部、内容和底部，父组件可以分别控制每个部分的内容。

示例：多个具名插槽

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

父组件：

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent>
    <template v-slot:header>
      <h1>这是头部</h1>
    </template>
    <template v-slot:content>
      <p>这是内容</p>
    </template>
    <template v-slot:footer>
      <button>这是底部按钮</button>
    </template>
  </ChildComponent>
</template>
```

------

🧠 总结

- **具名插槽**：允许你在子组件中指定插槽的位置，父组件通过指定插槽名称来传递内容。
- **作用域插槽**：父组件通过插槽可以访问子组件的数据或方法，使得组件更加灵活和解耦。
- **多个插槽**：子组件可以定义多个具名插槽，父组件可以分别填充每个插槽的位置。



------

💡 **实际案例**：自定义布局

想象一下，你需要做一个 **卡片组件**，它有一个头部（header）、一个内容区域（body）和一个底部（footer）。这个卡片可能有不同的用途：比如一个展示商品的卡片、一个展示用户信息的卡片，等等。每个卡片的头部、内容和底部可能都是不一样的。

如果我们不使用插槽，每次都要改动这个卡片组件，增加不同的内容。但如果用 **具名插槽**，我们可以 **灵活地在父组件中传递不同的内容**。

例子 ：用具名插槽创建可复用卡片组件

子组件 `Card.vue` (卡片组件)

```vue
<template>
  <div class="card">
    <!-- 具名插槽 header -->
    <div class="card-header">
      <slot name="header">默认标题</slot>  <!-- 如果父组件没有传 header，显示默认内容 -->
    </div>
    
    <!-- 具名插槽 body -->
    <div class="card-body">
      <slot>默认内容</slot>  <!-- 默认插槽，用于传递内容 -->
    </div>
    
    <!-- 具名插槽 footer -->
    <div class="card-footer">
      <slot name="footer">默认按钮</slot>
    </div>
  </div>
</template>

<script setup>
// 这里没有显式的 props，所有的内容通过插槽传入
</script>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}
.card-header {
  font-size: 1.5rem;
}
.card-body {
  padding: 10px;
}
.card-footer {
  text-align: center;
}
</style>
```

父组件 `App.vue`

在父组件中，我们可以 **根据需要** 传递不同的内容给卡片组件的每个区域（header、body、footer）。

```vue
<template>
  <div>
    <!-- 卡片 1 -->
    <Card>
      <template v-slot:header>
        <h2>商品展示卡片</h2>  <!-- 父组件传递 header 内容 -->
      </template>
      <template v-slot>
        <p>这是商品的详细信息...</p>  <!-- 默认插槽内容 -->
      </template>
      <template v-slot:footer>
        <button>立即购买</button>  <!-- footer 插槽内容 -->
      </template>
    </Card>

    <!-- 卡片 2 -->
    <Card>
      <template v-slot:header>
        <h2>用户信息卡片</h2>  <!-- 父组件传递不同的 header 内容 -->
      </template>
      <template v-slot>
        <p>这是用户的简介...</p>  <!-- 默认插槽内容 -->
      </template>
      <template v-slot:footer>
        <button>查看详情</button>  <!-- 不同的 footer 内容 -->
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from './Card.vue';
</script>
```

------

🎯 **实际效果**

在父组件中，卡片组件的 **header**、**body** 和 **footer** 部分是 **灵活定制的**：

- 在 **商品展示卡片** 中，头部是 “商品展示卡片”，内容是商品描述，底部是“立即购买”按钮。
- 在 **用户信息卡片** 中，头部是 “用户信息卡片”，内容是用户简介，底部是“查看详情”按钮。

这样，你就能在 **同一个卡片组件** 中，**灵活地改变每个部分的内容**，避免了重复编写不同内容的组件。





## table

**表格（table）** 是一个非常常用的 UI 组件。我们可以用它来展示结构化的数据，比如列表、产品信息、用户数据等。

对于 **Vue 3** 和 **Vue 3 的 `<script setup>` 写法**，我们可以通过简单的 HTML 标签、样式以及一些 Vue 的数据绑定功能来创建和管理表格。

在这里，我将给你讲解如何通过 Vue 来构建一个动态的表格，涵盖以下几个要点：

- **表格结构**：基本的 `<table>` 标签结构。
- **动态渲染数据**：用 Vue 渲染表格数据。
- **处理交互**：比如排序、分页、选择等。

------

🎯 1. **基本的表格结构**

表格的基本结构是由以下几个部分组成的：

```html
<table>
  <thead> <!-- 表头 -->
    <tr>
      <th>列1</th>
      <th>列2</th>
      <th>列3</th>
    </tr>
  </thead>
  <tbody> <!-- 表格主体 -->
    <tr>
      <td>数据1</td>
      <td>数据2</td>
      <td>数据3</td>
    </tr>
    <!-- 其他数据行 -->
  </tbody>
</table>
```

示例：一个简单的表格

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.city }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
])
</script>
```

在这个例子中，我们使用 `v-for` 指令来动态渲染 `tableData` 数组中的数据。每一行 (`<tr>`) 会根据数组中的每个对象生成。

------

🎯 2. **动态渲染数据**

使用 Vue 的 **`v-for`** 指令，我们可以把数组或者对象数据渲染到表格中。我们可以将数据存储在 Vue 的 `ref` 或 `reactive` 对象中，并通过模板语法将它们展示到表格里。

示例：表格数据与交互

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.city }}</td>
        <td><button @click="deleteRow(index)">删除</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
])

const deleteRow = (index) => {
  tableData.value.splice(index, 1) // 删除指定行
}
</script>
```

关键点：

- **`v-for`**：用来遍历数组数据并渲染每一行。
- **事件处理**：通过 `@click="deleteRow(index)"` 来绑定点击事件，触发删除操作。

------

🎯 3. **表格排序功能**

你可以通过点击表头来对表格中的数据进行排序。这里，我们可以通过对表格数据进行排序来实现。

示例：对表格数据按年龄排序

```vue
<template>
  <table>
    <thead>
      <tr>
        <th @click="sortData('name')">姓名</th>
        <th @click="sortData('age')">年龄</th>
        <th @click="sortData('city')">城市</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.city }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
])

const sortData = (key) => {
  tableData.value.sort((a, b) => {
    if (typeof a[key] === 'string') {
      return a[key].localeCompare(b[key])
    } else {
      return a[key] - b[key]
    }
  })
}
</script>
```

关键点：

- **`sortData` 方法**：通过点击表头的 `<th>` 来触发排序操作，按照指定的字段（`name`, `age`, `city`）进行排序。
- **`localeCompare`**：用于字符串的排序。
- **数字排序**：直接通过 `a[key] - b[key]` 对数字进行排序。

------

🎯 4. **表格分页功能**

当数据量较大时，分页是一个常见的需求。可以通过简单的分页逻辑来实现。

示例：表格分页

```vue
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>城市</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pagedData" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.city }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="prevPage">上一页</button>
      <button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
  { name: '赵六', age: 22, city: '深圳' },
  { name: '孙七', age: 26, city: '成都' },
  { name: '周八', age: 27, city: '武汉' },
])

const currentPage = ref(1)
const pageSize = 3

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return tableData.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  const totalPages = Math.ceil(tableData.value.length / pageSize)
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}
</script>
```

关键点：

- **分页逻辑**：`currentPage` 用来跟踪当前页数，`pageSize` 定义每页显示的条目数。
- **`pagedData` 计算属性**：根据当前页数和每页条目数，计算当前页应显示的数据。
- **上一页和下一页**：通过 `prevPage` 和 `nextPage` 方法来切换分页。

------

🧠 **总结**

- **动态渲染表格**：通过 `v-for` 来动态渲染数据。
- **排序功能**：使用 `sort()` 来排序表格数据，可以让用户根据列标题排序数据。
- **分页功能**：当数据量较大时，通过分页来展示部分数据，避免一次加载所有数据。
- **删除操作**：可以通过事件处理删除表格中的一行数据。

------



## v-model

在 Vue 中，`v-model` 是一个 **语法糖**，通常用于双向绑定数据。默认情况下，`v-model` 绑定到父组件的某个数据属性，并且会自动监听子组件触发的 `update:modelValue` 事件。

如果你需要在子组件中使用自定义事件来代替 `v-model`，可以通过 `modelValue` 和 `update:modelValue` 来完成。

------

🔧 **基本用法**

1. **在子组件中使用 `v-model`**

在 Vue 3 中，子组件接受 `modelValue` 作为 **绑定的 prop**，并通过触发 `update:modelValue` 事件来传递数据到父组件。

子组件：`ChildComponent.vue`

```vue
<template>
  <div>
    <!-- 输入框，改变值时触发 update:modelValue 事件 -->
    <input v-bind="attrs" :value="modelValue" @input="onInput" />
  </div>
</template>

<script setup>
defineProps(['modelValue'])  // 接收父组件的 modelValue
defineEmits(['update:modelValue'])  // 自定义事件，更新 modelValue

const onInput = (event) => {
  // 触发 update:modelValue 事件，将输入框的值传递给父组件
  emit('update:modelValue', event.target.value)
}
</script>
```

2. **在父组件中使用 `v-model`**

父组件通过 `v-model` 将一个值与子组件进行双向绑定。当子组件触发 `update:modelValue` 事件时，父组件的值会自动更新。

父组件：`ParentComponent.vue`

```vue
<template>
  <ChildComponent v-model="text" />
  <p>当前值：{{ text }}</p>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const text = ref('')  // 父组件的数据绑定给子组件
</script>
```

3. **渲染结果**

当用户在输入框中输入内容时，`ChildComponent` 会触发 `update:modelValue` 事件，更新父组件中的 `text`，从而实现 **双向绑定**。

------

🎯 **自定义事件名称（多个 `v-model`）**

Vue 3 允许你在子组件中使用多个 `v-model`，并为每个 `v-model` 绑定不同的事件名和属性名。你可以通过 `modelValue`（默认的绑定）或其他自定义的 prop 和事件名称来实现。

1. **多个 `v-model` 绑定**

子组件：`ChildComponent.vue`

```vue
<template>
  <div>
    <input :value="modelValue" @input="onInput" />
    <select :value="selected" @change="onChange">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'selected'])
defineEmits(['update:modelValue', 'update:selected'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
  emit('update:selected', event.target.value)
}
</script>
```

父组件：`ParentComponent.vue`

```vue
<template>
  <ChildComponent v-model="text" v-model:selected="selectedOption" />
  <p>文本：{{ text }}</p>
  <p>选项：{{ selectedOption }}</p>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const text = ref('')  // 父组件的数据绑定给子组件
const selectedOption = ref('option1')  // 另一个双向绑定的数据
</script>
```

在这个例子中，父组件使用了 **两个 `v-model`**：

- `v-model="text"` 绑定到子组件的 `modelValue`。
- `v-model:selected="selectedOption"` 绑定到子组件的 `selected`。

------

💡 **总结**

- **`v-model`** 默认会将父组件的 `modelValue` 作为子组件的 prop，并监听 `update:modelValue` 事件来更新父组件的值。
- **自定义事件名称**：在子组件中，你可以自定义事件名称，使用 `update:modelValue` 以外的事件名称，例如 `update:selected`，来进行绑定。
- **多个 `v-model`**：你可以在同一个组件中使用多个 `v-model`，通过自定义 prop 和事件名称来管理多个双向绑定。

------

🎯 **实际应用场景**

1. **表单组件**：比如输入框、单选框、复选框等，可以通过 `v-model` 进行数据双向绑定。
2. **自定义组件**：如模态框、选项卡、日期选择器等，父组件可以通过 `v-model` 传递并监听组件状态。
3. **动态交互**：例如多个值的绑定和更新，可以通过多个 `v-model` 来管理不同的状态。

------



## 事件

------

🎯 一、Vue 中事件的分类

| 类型           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| **DOM 事件**   | 绑定在 HTML 元素上的事件，比如点击、输入、悬停等（如 `@click`, `@input`） |
| **自定义事件** | 子组件触发，父组件监听，通常用在组件之间传递消息             |

------

📌 二、DOM 事件（用户交互）

这是最常见的场景，比如点击按钮、输入文本等。

✅ 示例：绑定 DOM 事件

```vue
<template>
  <button @click="handleClick">点击我</button>
</template>

<script setup>
const handleClick = () => {
  alert('按钮被点击了！')
}
</script>
```

- `@click` 是 `v-on:click` 的简写，绑定了一个点击事件。
- `handleClick` 是事件处理函数。

常见的 DOM 事件有：

- `@click`：点击事件
- `@input`：输入框内容变化
- `@change`：选择变化（如 `<select>`)
- `@keydown`：按键按下
- `@mouseenter` / `@mouseleave`：鼠标进入/离开

------

📣 三、自定义事件（子组件 → 父组件）

在 Vue 中，**自定义事件**主要是用来让子组件通知父组件「某事发生了」，比如点击了某个按钮、提交了表单、值更新了等等。

✅ 步骤：

1. 子组件通过 `emit` 触发事件
2. 父组件通过 `@事件名` 监听并响应

------

🔧 示例：子组件发送自定义事件

子组件：`Child.vue`

```vue
<template>
  <button @click="notifyParent">点我通知父组件</button>
</template>

<script setup>
const emit = defineEmits(['hello']) // 声明可发出的事件

const notifyParent = () => {
  emit('hello', '来自子组件的数据') // 触发事件并传参
}
</script>
```

父组件：`Parent.vue`

```vue
<template>
  <Child @hello="onHello" />
</template>

<script setup>
import Child from './Child.vue'

const onHello = (msg) => {
  console.log('接收到子组件事件：', msg)
}
</script>
```

📌 当子组件点击按钮时，会触发 `hello` 事件，父组件监听并执行 `onHello`。

------

🧠 四、Vue 事件修饰符

Vue 提供了一些简洁的 **修饰符** 来处理事件的默认行为或冒泡问题：

| 修饰符     | 作用                       |
| ---------- | -------------------------- |
| `.stop`    | 阻止事件冒泡               |
| `.prevent` | 阻止默认行为（如表单提交） |
| `.once`    | 事件只触发一次             |
| `.capture` | 使用捕获模式               |
| `.self`    | 仅在事件目标是自身时触发   |

示例：

```vue
<button @click.stop="handleClick">阻止冒泡</button>
<form @submit.prevent="onSubmit">阻止表单提交</form>
```

------

🧩 五、结合 `v-model` 的事件（双向绑定）

在 Vue 3 中，`v-model` 实际上是：

```vue
:prop + @update:prop 的语法糖
<ChildComponent v-model="value" />
```

等价于：

```vue
<ChildComponent :modelValue="value" @update:modelValue="value = $event" />
```

👉 所以如果你要让自定义组件支持 `v-model`，本质上就是让它**接收一个 `modelValue`**，并通过 **`emit('update:modelValue', 新值)`** 来传递更新。

------

✅ 总结

| 类型         | 用法                                     | 说明                              |
| ------------ | ---------------------------------------- | --------------------------------- |
| DOM 事件     | `@click="doSomething"`                   | 绑定用户交互                      |
| 自定义事件   | 子组件 `emit('xxx')`，父组件 `@xxx="fn"` | 父子通信的核心方式                |
| v-model 事件 | `@update:modelValue="..."`               | 支持双向绑定的标准写法            |
| 修饰符       | `.stop` `.prevent` `.once` 等            | 简化常见行为控制（阻止默认/冒泡） |

------



## 父子组件间通信方式

组件通信是 Vue 项目开发的**核心技能**之一。无论项目大还是小，只要你有多个组件，它们之间必然需要传递数据或触发行为。

------

🧭 一、组件通信的五种常见方式（Vue 3）

| 类型                       | 方向                         | 使用场景                         |
| -------------------------- | ---------------------------- | -------------------------------- |
| `props / emit`             | **父传子 / 子传父**          | 最基本的通信方式（最常用）       |
| `provide / inject`         | **祖先组件 → 任意后代**      | 跨多层组件的传值，适合全局配置等 |
| `v-model`                  | **父子双向绑定**             | 父组件控制子组件中的数据         |
| **ref / expose**           | **父组件直接调用子组件方法** | 控制组件行为（如调用内部函数）   |
| **全局状态**（如 `pinia`） | **任意组件间通信**           | 多个组件共享状态，适合大型项目   |

------

🎯 二、父子组件通信

✅ 1. 父传子：通过 `props`

```vue
<!-- Parent.vue -->
<Child :title="msg" />

<script setup>
import Child from './Child.vue'
const msg = 'Hello 子组件'
</script>
<!-- Child.vue -->
<template><h1>{{ title }}</h1></template>

<script setup>
defineProps(['title']) // 接收 props
</script>
```

------

✅ 2. 子传父：通过 `emit`

```vue
<!-- Child.vue -->
<template><button @click="send">通知父组件</button></template>

<script setup>
const emit = defineEmits(['hello'])
const send = () => emit('hello', '你好父组件')
</script>
<!-- Parent.vue -->
<Child @hello="handleHello" />

<script setup>
import Child from './Child.vue'
const handleHello = (msg) => {
  console.log('接收子组件消息：', msg)
}
</script>
```

------

🔁 三、父子双向绑定：`v-model`

Vue 3 中，`v-model` 实际是：

```vue
:prop="value" + @update:prop
<!-- Parent.vue -->
<CustomInput v-model="inputValue" />

<script setup>
import CustomInput from './CustomInput.vue'
const inputValue = ref('')
</script>
<!-- CustomInput.vue -->
<template>
  <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
```

------

🪢 四、跨多层嵌套：`provide / inject`

适合 **祖先组件传值给多个后代组件**，比如主题、配置、当前用户等。

```vue
<!-- GrandParent.vue -->
<script setup>
import { provide } from 'vue'
provide('color', 'red')
</script>
<!-- DeepChild.vue -->
<script setup>
import { inject } from 'vue'
const color = inject('color')
</script>
```

- 不需要一层层 props 传递。
- 仅限**从上往下传**（单向）。
- 通常用于「上下文传递」：如国际化、表单共享、主题配置等。

------

🧩 五、通过 `ref` 获取子组件实例并调用方法

适用于**父组件直接操作子组件的行为**（不推荐用来传数据）。

```vue
<!-- Child.vue -->
<script setup>
const sayHi = () => {
  console.log('子组件说：你好')
}
defineExpose({ sayHi }) // 公开方法
</script>
<!-- Parent.vue -->
<template>
  <Child ref="childRef" />
  <button @click="childRef?.sayHi()">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const childRef = ref(null)
</script>
```

------

🧠 六、跨组件通信（任意组件）：使用 Pinia

适用于**非父子组件之间**的通信，例如兄弟组件、远亲组件。

```bash
# 安装 pinia（如果还没装）
npm install pinia
// store/counter.js
import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

在任何组件中使用：

```vue
<script setup>
import { useCounter } from '@/store/counter'
const counter = useCounter()
</script>

<template>
  <button @click="counter.increment">点击：{{ counter.count }}</button>
</template>
```

------

✅ 总结

| 场景            | 推荐方式             |
| --------------- | -------------------- |
| 父传子 / 子传父 | `props` / `emit`     |
| 父子双向绑定    | `v-model`            |
| 多级嵌套传值    | `provide / inject`   |
| 父调用子方法    | `ref + defineExpose` |
| 跨组件共享数据  | `pinia / 全局状态`   |

------





## 异步数据渲染时机控制

这是一个非常常见、**初学者必遇的问题**：

> 🚨“父组件通过 `props` 向子组件传数据，但子组件里拿不到或者是 `undefined`。”

下面我从**原因 + 解决方法 + 真实例子**三个角度详细给你讲清楚。

------

🧠 一、常见现象

你可能有如下场景：

父组件代码（异步获取数据）：

```vue
<script setup>
import { ref, onMounted } from 'vue'
import MyChild from './MyChild.vue'

const user = ref(null)

onMounted(async () => {
  const res = await fetch('/api/user')
  user.value = await res.json()
})
</script>

<template>
  <MyChild :user="user" />
</template>
```

子组件：

```vue
<script setup>
const props = defineProps(['user'])
console.log('user 是:', props.user)  // 🚨 undefined!
</script>
```

你会发现：

> ❌ 子组件初次加载时，`props.user` 是 `undefined`，而不是异步加载完成后的对象。

------

✅ 二、为什么会出现这个问题？

Vue 的渲染是 **响应式的、同步的**。当父组件第一次渲染时：

- `user.value` 还是 `null`
- 所以 `<MyChild :user="user" />` 传进去的是 `null`
- 子组件一创建，立即读取 `props.user`，拿到的是空的值

之后虽然 `user.value` 异步变了，但你可能在子组件中**没有正确监听变化**，所以**子组件不会立即响应更新逻辑**。

------

🛠 三、解决方案（根据不同需求）

------

✅ 方案 1：在子组件中使用 `watch` 监听 props 的变化

```vue
<script setup>
import { watch } from 'vue'
const props = defineProps(['user'])

watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      console.log('父组件异步传过来的 user 数据：', newVal)
    }
  },
  { immediate: true } // 组件初始化时也执行一次
)
</script>
```

> 💡 这是最推荐的做法，用于子组件在父数据加载完成后**初始化自己的状态、发请求或渲染内容**。

------

✅ 方案 2：子组件中使用 `computed` 计算属性使用 props

```vue
<script setup>
import { computed } from 'vue'
const props = defineProps(['user'])

const username = computed(() => props.user?.name || '加载中...')
</script>
```

> 💡 如果只是用来显示、渲染内容，可以直接用 computed 包装。

------

✅ 方案 3：使用 `v-if` 控制子组件加载时机（防止空值）

父组件：

```vue
<template>
  <MyChild v-if="user" :user="user" />
</template>
```

> 💡 这样做可以防止子组件一开始就挂载，等父组件数据有了才渲染，适合子组件依赖数据较重的场景。

------

🧪 四、完整示例

父组件：

```vue
<template>
  <MyChild v-if="user" :user="user" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MyChild from './MyChild.vue'

const user = ref(null)

onMounted(async () => {
  const res = await fetch('/api/user')
  user.value = await res.json()
})
</script>
```

子组件：

```vue
<script setup>
import { watch } from 'vue'
const props = defineProps(['user'])

watch(
  () => props.user,
  (val) => {
    console.log('接收到的用户数据是：', val)
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="user">用户名：{{ user.name }}</div>
</template>
```

------

🧠 总结

| 问题原因 | 父组件是异步更新数据，子组件在数据还没准备好时已经挂载     |
| -------- | ---------------------------------------------------------- |
| 解决方法 | 使用 `watch` 监听 props 变化，或 `v-if` 控制子组件渲染时机 |



## 依赖注入

当然！我们来讲清楚 Vue 的依赖注入机制，也就是 `provide` / `inject`，这是 Vue 提供的**跨层级组件通信方式**，可以让祖先组件向后代组件传递数据，而不需要层层通过 `props` 一步步传下去。

------

🎯 什么是依赖注入（provide / inject）？

> **`provide` 是祖先组件提供数据，`inject` 是后代组件取用数据**。

✔️ 跨越多个嵌套层级
 ✔️ 不需要 props
 ✔️ 主要用于配置、上下文、共享状态、全局注入等场景

------

✅ 使用场景示意图

```plaintext
<App>                 → 提供者（provide）
 └── <A>             → 不参与传递
     └── <B>
         └── <C>     → 使用者（inject）
```

> App 组件用 `provide` 提供数据，组件 C 通过 `inject` 直接使用，**中间组件 A、B 不需要参与传值**。

------

🔧 基本用法

🧱 父组件中使用 `provide`

```vue
<!-- App.vue -->
<script setup>
import { provide } from 'vue'

provide('themeColor', 'blue')  // 提供一个名为 themeColor 的值
</script>

<template>
  <Child />
</template>
```

📦 子组件中使用 `inject`

```vue
<!-- Child.vue -->
<script setup>
import { inject } from 'vue'

const themeColor = inject('themeColor')  // 直接拿到祖先组件提供的值
</script>

<template>
  <p>当前主题颜色是：{{ themeColor }}</p>
</template>
```

------

🎯 Vue 3 中 `<script setup>` 写法完整示例

🧩 App.vue

```vue
<script setup>
import { provide } from 'vue'
import Layout from './Layout.vue'

provide('lang', 'zh-CN') // 向后代组件提供语言配置
</script>

<template>
  <Layout />
</template>
```

------

🧩 Layout.vue（中间层组件，不参与传递）

```vue
<script setup>
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div>
    <Sidebar />
  </div>
</template>
```

------

🧩 Sidebar.vue（后代组件接收）

```vue
<script setup>
import { inject } from 'vue'

const lang = inject('lang')
</script>

<template>
  <p>当前语言：{{ lang }}</p>
</template>
```

------

⚠️ 注意事项

| 点   | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| 1️⃣    | `provide` 和 `inject` 是**基于上下文的**，不能跨应用或跨组件树使用 |
| 2️⃣    | 注入值是**响应式的（如果你注入的是 ref）**，否则只是普通值   |
| 3️⃣    | 可以给 `inject` 设置默认值：`inject('theme', 'light')`       |
| 4️⃣    | `provide` 的值如果是 ref，对象内部的值也会响应更新           |

------

🧪 响应式传递的示例

```vue
<!-- App.vue -->
<script setup>
import { provide, ref } from 'vue'
const username = ref('Alice')
provide('username', username)
</script>

<template>
  <Child />
</template>

<!-- Child.vue -->
<script setup>
import { inject } from 'vue'
const username = inject('username')
</script>

<template>
  <p>用户名是：{{ username }}</p>
</template>
```

> 父组件更新 `username.value`，子组件显示内容也会自动更新 ✅

------

✅ 总结

| 特性         | 说明                                               |
| ------------ | -------------------------------------------------- |
| 传递方向     | 祖先组件 → 任意后代组件                            |
| 不依赖 props | 不用一级一级地传值                                 |
| API          | `provide(key, value)` 和 `inject(key[, default])`  |
| 常用场景     | 全局配置（主题、语言）、表单上下文、祖先状态共享等 |
| 响应性       | 依赖你传的是不是 `ref`                             |

------



## 事件总线

------

🎯 什么是事件总线？

> **事件总线是一种“全局通信”机制**，允许任意两个组件之间传递事件，而不要求它们是父子关系。

它本质上是一个 **中央调度者（对象）**，用来在组件之间发事件、听事件。

------

✅ 在 Vue 2 中的传统做法：

创建一个 **空的 Vue 实例**，所有组件共享它来发事件和监听事件。

```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

在 A 组件中发送事件：

```js
EventBus.$emit('eventName', data)
```

在 B 组件中监听事件：

```js
EventBus.$on('eventName', (data) => {
  console.log('接收到数据：', data)
})
```

------

❌ Vue 3 中不推荐这么用（Vue 实例不再支持 `$on/$emit`）

Vue 3 没有了 Vue 2 中的 `$on`、`$off`、`$emit` 方法，**不能再使用 `new Vue()` 作为事件总线**。

所以我们需要手动实现一个事件总线对象。

------

✅ Vue 3 中事件总线的正确实现方式

我们可以用一个简单的 `mitt` 库来实现事件总线，**轻量高效**，推荐。

------

1. 安装 mitt（推荐方式）

```bash
npm install mitt
```

------

2. 创建全局事件总线

```js
// event-bus.js
import mitt from 'mitt'
export const emitter = mitt()
```

------

3. 在组件中使用

A 组件（发送事件）：

```vue
<script setup>
import { emitter } from './event-bus'

const sendMessage = () => {
  emitter.emit('custom-event', 'hello from A')
}
</script>

<template>
  <button @click="sendMessage">发送消息</button>
</template>
```

------

B 组件（接收事件）：

```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { emitter } from './event-bus'

const handleEvent = (msg) => {
  console.log('接收到事件数据：', msg)
}

onMounted(() => {
  emitter.on('custom-event', handleEvent)
})

onBeforeUnmount(() => {
  emitter.off('custom-event', handleEvent)
})
</script>

<template>
  <p>我是 B 组件，监听事件</p>
</template>
```

------

🧠 对比：事件总线 vs 其他通信方式

| 方式             | 特点/用途                    |
| ---------------- | ---------------------------- |
| props / emit     | 父子通信，推荐使用           |
| provide / inject | 跨多层嵌套，传上下文、配置等 |
| pinia / vuex     | 多组件共享状态（推荐）       |
| **事件总线**     | 任意组件间**事件触发**       |

------

✅ 总结

| 特点             | 说明                                                |
| ---------------- | --------------------------------------------------- |
| 跨组件通信       | 可以在任何两个组件之间发送和接收事件                |
| Vue 3 推荐方式   | 使用 `mitt` 来代替 Vue 2 中的 `$on/$emit` 模式      |
| 使用场景         | 模态框控制、全局消息通知、非父子组件通信等          |
| 生命周期管理重要 | 必须 `onBeforeUnmount` 中手动取消监听，防止内存泄漏 |

------

🚀 Bonus：事件总线适合什么场景？

- 👁️‍🗨️ 显示全局提示弹窗（如 toast、message）
- 📦 控制全局 loading 状态
- 🧩 解耦不相关组件之间的通信（例如搜索框和结果列表）

------









# unibest

