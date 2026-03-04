import { Canvas, FabricImage, Rect, Control } from "fabric";
export class CanvasManager {
  // 创建初始画布
  constructor(canvasEl, options = {}) {
    // 保存回调函数
    this.onRectangleAdded = options.onRectangleAdded;
    this.onRectangleUpdated = options.onRectangleUpdated;
    this.onRectangleDeleted = options.onRectangleDeleted;

    this.canvas = new Canvas(canvasEl, {
      width: canvasEl.clientWidth || 800,
      height: canvasEl.clientHeight || 600,
      backgroundColor: "#f0f0f0",
      selection: false,
    });

    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.currentRect = null;
    this.deleteIconImg = null;
    this.rectangles = [];

    this.initEvents();
  }

  // 设置背景图片
  async setBackground(imageUrl) {
    try {
      // 保存图片URL/路径
      this.imageUrl =
        typeof imageUrl === "string"
          ? imageUrl
          : imageUrl?.default || imageUrl?.src || imageUrl;

      const img = await FabricImage.fromURL(this.imageUrl);

      // 保存原始图片尺寸
      this.originalImageWidth = img.width;
      this.originalImageHeight = img.height;

      // 缩放图片以适应画布宽度
      img.scaleToWidth(this.canvas.getWidth());

      // 保存缩放后的尺寸（实际显示尺寸）
      this.scaledImageWidth = img.width * (img.scaleX || 1);
      this.scaledImageHeight = img.height * (img.scaleY || 1);

      this.canvas.backgroundImage = img;
      this.canvas.requestRenderAll();

      return {
        image: img,
        imageUrl: this.imageUrl, // 返回图片路径
        originalSize: {
          width: this.originalImageWidth,
          height: this.originalImageHeight,
        },
        scaledSize: {
          width: this.scaledImageWidth,
          height: this.scaledImageHeight,
        },
        scaleX: img.scaleX,
        scaleY: img.scaleY,
      };
    } catch (error) {
      console.error("背景加载失败：", error);
      throw error;
    }
  }

  // 获取图片URL/路径
  getImageUrl() {
    return this.imageUrl || null;
  }

  // 获取图片尺寸信息
  getImageSize() {
    if (!this.canvas.backgroundImage) {
      return null;
    }

    return {
      original: {
        width: this.originalImageWidth || 0,
        height: this.originalImageHeight || 0,
      },
      scaled: {
        width: this.scaledImageWidth || 0,
        height: this.scaledImageHeight || 0,
      },
      scaleX: this.canvas.backgroundImage.scaleX || 1,
      scaleY: this.canvas.backgroundImage.scaleY || 1,
    };
  }

  // 加载删除图标
  async loadDeleteIcon(iconUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = iconUrl;
      img.onload = () => {
        this.deleteIconImg = img;
        resolve(img);
      };
      img.onerror = () => {
        console.warn("删除图标加载失败，使用默认样式");
        resolve(null);
      };
    });
  }

  // 初始化事件
  initEvents() {
    this.canvas.on("mouse:down", this.handleMouseDown.bind(this));
    this.canvas.on("mouse:move", this.handleMouseMove.bind(this));
    this.canvas.on("mouse:up", this.handleMouseUp.bind(this));
    this.canvas.on("selection:created", this.handleSelectionCreated.bind(this));
  }

  // 鼠标按下事件
  handleMouseDown(opt) {
    if (opt.target) {
      return; // 点击了已有对象，进入编辑模式
    }
    if (this.isDrawing) return;

    this.startDrawing(opt);
  }

  // 开始绘制
  startDrawing(opt) {
    const pointer = this.canvas.getScenePoint(opt.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.isDrawing = true;

    this.currentRect = new Rect({
      left: this.startX,
      top: this.startY,
      width: 0,
      height: 0,
      fill: "rgba(255,0,0,0.3)",
      stroke: "red",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasRotatingPoint: false,
      cornerColor: "red",
      transparentCorners: false,
      cornerStyle: "circle",
      cornerSize: 12,
      strokeDashArray: [5, 5],
    });

    // 添加删除控制点
    const deleteControl = this.createDeleteControl();
    this.currentRect.controls.deleteBtn = deleteControl;
    this.currentRect.setControlVisible("mtr", false);

    this.canvas.add(this.currentRect);
    this.canvas.requestRenderAll();
  }

  // 创建删除控制点
  createDeleteControl() {
    return new Control({
      x: 0.5,
      y: -0.5,
      offsetX: 10,
      offsetY: -10,
      cursorStyle: "pointer",
      cornerSize: 24,
      render: this.renderDeleteIcon.bind(this),
      mouseUpHandler: this.deleteHandler.bind(this),
    });
  }

  // 鼠标移动事件
  handleMouseMove(opt) {
    if (!this.isDrawing || !this.currentRect) return;

    const pointer = this.canvas.getScenePoint(opt.e);
    const w = Math.abs(pointer.x - this.startX);
    const h = Math.abs(pointer.y - this.startY);

    this.currentRect.set({
      width: w,
      height: h,
      left: Math.min(pointer.x, this.startX),
      top: Math.min(pointer.y, this.startY),
    });

    this.canvas.requestRenderAll();
  }

  // 鼠标松开事件
  handleMouseUp() {
    if (!this.isDrawing || !this.currentRect) return;
    this.isDrawing = false;

    // 检查矩形尺寸，太小则删除
    if (this.currentRect.width < 5 || this.currentRect.height < 5) {
      this.canvas.remove(this.currentRect);
      this.currentRect = null;
      this.canvas.requestRenderAll();
      return;
    }

    this.finalizeRectangle();
  }

  // CanvasManager.js
  finalizeRectangle() {
    const id = `rect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const coords = this.currentRect.getCoords();

    const rectData = {
      id,
      fabricObject: this.currentRect,
      coords: {
        tl: coords[0],
        tr: coords[1],
        br: coords[2],
        bl: coords[3],
      },
      left: this.currentRect.left,
      top: this.currentRect.top,
      width: this.currentRect.width,
      height: this.currentRect.height,
      angle: this.currentRect.angle,
    };

    // 保存到 rectangles 数组
    this.rectangles.push(rectData);

    // 直接调用回调函数添加到 store
    if (this.onRectangleAdded) {
      this.onRectangleAdded(rectData);
    }

    this.canvas.setActiveObject(this.currentRect);

    // 绑定实时更新事件
    this.currentRect.on("moving", () => this.updateRectCoords(rectData));
    this.currentRect.on("scaling", () => this.updateRectCoords(rectData));
    this.currentRect.on("rotating", () => this.updateRectCoords(rectData));

    this.currentRect = null;
    this.canvas.requestRenderAll();

    return rectData;
  }

  // 更新矩形坐标
  updateRectCoords(rectData) {
    const obj = rectData.fabricObject;
    const coords = obj.getCoords();

    rectData.coords = {
      tl: {
        x: Number(coords[0].x.toFixed(2)),
        y: Number(coords[0].y.toFixed(2)),
      },
      tr: {
        x: Number(coords[1].x.toFixed(2)),
        y: Number(coords[1].y.toFixed(2)),
      },
      br: {
        x: Number(coords[2].x.toFixed(2)),
        y: Number(coords[2].y.toFixed(2)),
      },
      bl: {
        x: Number(coords[3].x.toFixed(2)),
        y: Number(coords[3].y.toFixed(2)),
      },
    };

    rectData.left = Number(obj.left.toFixed(2));
    rectData.top = Number(obj.top.toFixed(2));
    rectData.width = Number(obj.width.toFixed(2));
    rectData.height = Number(obj.height.toFixed(2));
    rectData.angle = Number(obj.angle.toFixed(2));

    // 通知更新
    if (this.onRectangleUpdated) {
      this.onRectangleUpdated(rectData);
    }
  }

  // 选中事件
  handleSelectionCreated(opt) {
    const active = opt.target;
    const data = this.rectangles.find((r) => r.fabricObject === active);
    if (data) this.updateRectCoords(data);
  }

  // 删除处理
  deleteHandler(eventData, transform) {
    const target = transform.target;
    if (!target) return false;

    // 找到要删除的矩形数据
    const rectData = this.rectangles.find((r) => r.fabricObject === target);

    // 从 rectangles 中移除
    this.rectangles = this.rectangles.filter((r) => r.fabricObject !== target);

    // 调用删除回调
    if (rectData && this.onRectangleDeleted) {
      this.onRectangleDeleted(rectData.id);
    }

    this.canvas.remove(target);
    this.canvas.requestRenderAll();
    return true;
  }

  // 渲染删除图标
  renderDeleteIcon(ctx, left, top) {
    if (!this.deleteIconImg) {
      // 降级样式
      ctx.save();
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(left, top, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(left - 6, top - 6);
      ctx.lineTo(left + 6, top + 6);
      ctx.moveTo(left + 6, top - 6);
      ctx.lineTo(left - 6, top + 6);
      ctx.stroke();
      ctx.restore();
      return;
    }

    const size = 20;
    ctx.drawImage(
      this.deleteIconImg,
      left - size / 2,
      top - size / 2,
      size,
      size
    );
  }

  // 获取所有矩形数据
  getRectangles() {
    return this.rectangles.map((rect) => ({
      id: rect.id,
      coords: rect.coords,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      angle: rect.angle,
    }));
  }

  // 清空画布（保留背景图片）
  clear() {
    // 获取所有对象（不包括背景图片）
    const objects = this.canvas.getObjects();

    // 移除所有对象
    objects.forEach((obj) => {
      this.canvas.remove(obj);
    });

    // 清空矩形数组
    this.rectangles = [];

    // 重新渲染
    this.canvas.requestRenderAll();
  }

  // 清空所有（包括背景图片）
  clearAll() {
    // 清空所有对象
    this.clear();

    // 清空背景图片
    this.canvas.backgroundImage = null;

    // 重新渲染
    this.canvas.requestRenderAll();
  }

  // 调整画布大小
  resize(width, height) {
    this.canvas.setDimensions({ width, height });
    if (this.canvas.backgroundImage) {
      this.canvas.backgroundImage.scaleToWidth(width);
    }
    this.canvas.requestRenderAll();
  }

  // 销毁
  destroy() {
    this.canvas.off("mouse:down");
    this.canvas.off("mouse:move");
    this.canvas.off("mouse:up");
    this.canvas.off("selection:created");
    this.canvas.dispose();
  }
}

