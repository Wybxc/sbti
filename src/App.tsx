import { snapdom } from "@zumer/snapdom";
import { useEffect, useRef, useState } from "react";

type FormData = {
  personalityType: string;
  englishType: string;
  description: string;
  matchRate: string;
  accuracy: string;
  interpretation: string;
};

const initialFormData: FormData = {
  personalityType: "尤物",
  englishType: "SEXY",
  description: "您就是天生的尤物！",
  matchRate: "70%",
  accuracy: "9/15",
  interpretation:
    "当您走进一个房间，照明系统会自动将您识别为天生的尤物！您的存在会让周围环境温度显著下降，因为水蒸气都凝结成了人眼中",
};

export function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://placehold.co/200x250/FFD700/FFFFFF?text=Character",
  );
  const previewRef = useRef<HTMLDivElement | null>(null);
  const uploadedImageUrlRef = useRef<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) {
      return;
    }

    if (uploadedImageUrlRef.current) {
      URL.revokeObjectURL(uploadedImageUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    uploadedImageUrlRef.current = objectUrl;
    setImageUrl(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (uploadedImageUrlRef.current) {
        URL.revokeObjectURL(uploadedImageUrlRef.current);
      }
    };
  }, []);

  const handleGenerateAndSaveImage = async () => {
    const previewElement = previewRef.current;
    if (!previewElement) {
      return;
    }

    const result = await snapdom(previewElement, {
      backgroundColor: "#f8fafc",
      scale: window.devicePixelRatio > 1 ? 2 : 1,
      embedFonts: true,
    });

    await result.download({
      filename: `SBTI_${formData.personalityType}_${Date.now()}.png`,
    });
  };

  const previewCard = (
    <>
      <div className="mb-3.5 rounded-3xl border border-white/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <h3
          className="mb-3.5 text-center text-base font-medium"
          style={{ color: "#4b5563" }}
        >
          你的人格类型是：
        </h3>
        <div className="text-center">
          <h2
            className="mb-1 text-4xl font-black tracking-tight sm:text-[40px]"
            style={{ color: "#111827" }}
          >
            {formData.personalityType}
          </h2>
          <h3
            className="mb-4 text-3xl font-black tracking-[0.2em] sm:text-[34px]"
            style={{ color: "#22c55e" }}
          >
            {formData.englishType}
          </h3>

          <div className="mb-3 flex justify-center">
            <img
              src={imageUrl}
              alt="Cartoon character"
              className="h-60 w-48 rounded-2xl object-cover shadow-lg"
            />
          </div>

          <p className="m-0 leading-relaxed" style={{ color: "#475569" }}>
            {formData.description}
          </p>
        </div>
      </div>

      <div className="mb-3.5 rounded-3xl border border-white/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <h4
          className="mb-2 text-[17px] font-medium"
          style={{ color: "#4b5563" }}
        >
          你的主类型
        </h4>
        <h3
          className="mb-3.5 text-2xl font-black sm:text-[30px]"
          style={{ color: "#111827" }}
        >
          {formData.englishType}（{formData.personalityType}）
        </h3>

        <div
          className="mb-3 inline-flex items-center rounded-full px-4 py-2 text-sm font-bold"
          style={{ backgroundColor: "#dcfce7", color: "#166534" }}
        >
          匹配度 {formData.matchRate} · 精准命中 {formData.accuracy} 维
        </div>

        <p className="m-0 leading-relaxed" style={{ color: "#475569" }}>
          维度命中度较高，当前结果可视为你的第一人格画像。
        </p>
      </div>

      <div className="rounded-3xl border border-white/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <h4 className="mb-2 text-[17px] font-bold" style={{ color: "#111827" }}>
          该人格的简单解读
        </h4>
        <p
          className="m-0 whitespace-pre-wrap leading-relaxed"
          style={{ color: "#475569" }}
        >
          {formData.interpretation}
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen px-4 py-6 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="hero rounded-4xl border border-base-200 bg-base-100/90 shadow-xl backdrop-blur-sm">
          <div className="hero-content flex-col gap-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="badge badge-primary badge-outline">SBTI</div>
                <div className="badge badge-secondary badge-outline">
                  daisyUI
                </div>
                <div className="badge badge-accent badge-outline">
                  SnapDOM 导出
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-5xl">
                SBTI人格类型生成器
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-base-content/70 sm:text-lg">
                用更清晰的卡片层次、输入组件和移动端预览，把原来的原型页面整理成更像正式产品的界面。
              </p>
            </div>

            <div className="stats stats-vertical bg-base-200 shadow md:stats-horizontal">
              <div className="stat px-6 py-4">
                <div className="stat-title">当前类型</div>
                <div className="stat-value text-3xl">
                  {formData.personalityType}
                </div>
                <div className="stat-desc">{formData.englishType}</div>
              </div>
              <div className="stat px-6 py-4">
                <div className="stat-title">匹配度</div>
                <div className="stat-value text-3xl">{formData.matchRate}</div>
                <div className="stat-desc">精准命中 {formData.accuracy}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <section className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body gap-6">
              <div>
                <h2 className="card-title text-2xl">输入您的SBTI信息</h2>
                <p className="text-sm text-base-content/60">
                  修改内容后，右侧预览会同步更新。
                </p>
              </div>

              <div className="grid gap-4">
                <div className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">
                      上传人物图片
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={(event) =>
                      handleImageUpload(event.target.files?.[0] ?? null)
                    }
                  />
                  <div className="label">
                    <span className="label-text-alt text-base-content/60">
                      支持 JPG、PNG、WebP 等常见图片格式
                    </span>
                  </div>
                </div>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">
                      人格类型名称
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.personalityType}
                    onChange={(e) =>
                      handleInputChange("personalityType", e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder="例如：尤物"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">英文类型</span>
                  </div>
                  <input
                    type="text"
                    value={formData.englishType}
                    onChange={(e) =>
                      handleInputChange("englishType", e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder="例如：SEXY"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">简短描述</span>
                  </div>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder="例如：您就是天生的尤物！"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">匹配度 (%)</span>
                  </div>
                  <input
                    type="text"
                    value={formData.matchRate}
                    onChange={(e) =>
                      handleInputChange("matchRate", e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder="例如：70%"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">精准命中</span>
                  </div>
                  <input
                    type="text"
                    value={formData.accuracy}
                    onChange={(e) =>
                      handleInputChange("accuracy", e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder="例如：9/15"
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">人格解读</span>
                  </div>
                  <textarea
                    value={formData.interpretation}
                    onChange={(e) =>
                      handleInputChange("interpretation", e.target.value)
                    }
                    className="textarea textarea-bordered min-h-36 w-full"
                    placeholder="例如：当您走进一个房间，照明系统会自动将您识别为天生的尤物！"
                  />
                </label>
              </div>

              <div className="card-actions justify-end">
                <button
                  onClick={handleGenerateAndSaveImage}
                  className="btn btn-primary btn-wide"
                  type="button"
                >
                  生成并保存图片
                </button>
              </div>
            </div>
          </section>

          <section className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body gap-6">
              <div>
                <h2 className="card-title text-2xl">预览效果</h2>
                <p className="text-sm text-base-content/60">
                  右侧区域用于导出图片，样式保持固定以保证截图稳定。
                </p>
              </div>

              <div ref={previewRef} className="mockup-phone mx-auto">
                <div className="mockup-phone-camera" />
                <div className="mockup-phone-display bg-[#f8fafc]">
                  <div className="h-full w-full overflow-hidden bg-[#f8fafc]">
                    <div className="flex h-11 items-center justify-between px-5 text-sm font-semibold"></div>

                    <div className="h-[calc(100%-44px)] overflow-y-auto p-5">
                      {previewCard}
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert alert-info">
                <span>点击按钮会直接导出右侧预览为 PNG 图片。</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
