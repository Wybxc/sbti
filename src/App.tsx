import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

type FormData = {
  personalityType: string;
  englishType: string;
  description: string;
  matchRate: string;
  accuracy: string;
  interpretation: string;
};

const initialFormData: FormData = {
  personalityType: '尤物',
  englishType: 'SEXY',
  description: '您就是天生的尤物！',
  matchRate: '70%',
  accuracy: '9/15',
  interpretation:
    '当您走进一个房间，照明系统会自动将您识别为天生的尤物！您的存在会让周围环境温度显著下降，因为水蒸气都凝结成了人眼中',
};

export function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateAndSaveImage = async () => {
    const previewElement = previewRef.current;
    if (!previewElement) {
      return;
    }

    const canvas = await html2canvas(previewElement, {
      backgroundColor: '#f8fafc',
      scale: window.devicePixelRatio > 1 ? 2 : 1,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.download = `SBTI_${formData.personalityType}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const previewCard = (
    <>
      <div className="mb-3.5 rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <h3 className="mb-3.5 text-center text-base text-slate-600">你的人格类型是：</h3>
        <div className="text-center">
          <h2 className="mb-1 text-4xl font-bold sm:text-[40px]">{formData.personalityType}</h2>
          <h3 className="mb-4 text-3xl font-bold text-green-500 sm:text-[34px]">
            {formData.englishType}
          </h3>

          <div className="mb-3 flex justify-center">
            <img
              src="https://placehold.co/200x250/FFD700/FFFFFF?text=Character"
              alt="Cartoon character"
              className="h-60 w-48 rounded-lg object-cover"
            />
          </div>

          <p className="m-0 leading-relaxed text-slate-600">{formData.description}</p>
        </div>
      </div>

      <div className="mb-3.5 rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <h4 className="mb-2 text-[17px] text-slate-600">你的主类型</h4>
        <h3 className="mb-3.5 text-2xl font-bold sm:text-[30px]">
          {formData.englishType}（{formData.personalityType}）
        </h3>

        <div className="mb-3 inline-block rounded-full bg-green-100 px-3 py-2 text-sm font-bold text-green-700">
          匹配度 {formData.matchRate} · 精准命中 {formData.accuracy} 维
        </div>

        <p className="m-0 leading-relaxed text-slate-600">维度命中度较高，当前结果可视为你的第一人格画像。</p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <h4 className="mb-2 text-[17px] font-bold text-slate-900">该人格的简单解读</h4>
        <p className="m-0 whitespace-pre-wrap leading-relaxed text-slate-600">
          {formData.interpretation}
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-100 to-pink-100 p-3 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800 sm:text-4xl">
          SBTI人格类型生成器
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <h2 className="mb-5 text-2xl font-semibold text-slate-700">输入您的SBTI信息</h2>

            <div className="grid gap-3.5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">人格类型名称</span>
                <input
                  type="text"
                  value={formData.personalityType}
                  onChange={(e) => handleInputChange('personalityType', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：尤物"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">英文类型</span>
                <input
                  type="text"
                  value={formData.englishType}
                  onChange={(e) => handleInputChange('englishType', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：SEXY"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">简短描述</span>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：您就是天生的尤物！"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">匹配度 (%)</span>
                <input
                  type="text"
                  value={formData.matchRate}
                  onChange={(e) => handleInputChange('matchRate', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：70%"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">精准命中</span>
                <input
                  type="text"
                  value={formData.accuracy}
                  onChange={(e) => handleInputChange('accuracy', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：9/15"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">人格解读</span>
                <textarea
                  value={formData.interpretation}
                  onChange={(e) => handleInputChange('interpretation', e.target.value)}
                  className="min-h-32 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="例如：当您走进一个房间，照明系统会自动将您识别为天生的尤物！"
                />
              </label>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleGenerateAndSaveImage}
                className="flex-1 rounded-lg bg-linear-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-base font-bold text-white transition hover:from-fuchsia-600 hover:to-pink-600"
                type="button"
              >
                生成并保存图片
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <h2 className="mb-5 text-2xl font-semibold text-slate-700">预览效果</h2>

            <div
              ref={previewRef}
              className="relative mx-auto h-180 w-full max-w-93.75 overflow-hidden rounded-[40px] bg-slate-50 shadow-[0_20px_40px_rgba(0,0,0,0.28)] sm:h-203"
            >
              <div className="absolute left-1/2 top-0 z-10 h-7.5 w-45 -translate-x-1/2 rounded-b-[20px] bg-zinc-100" />
              <div className="flex h-11 items-center justify-between bg-zinc-100 px-5 text-sm font-semibold">
                <span>19:56</span>
                <div className="flex gap-2 text-xs" aria-hidden="true">
                  <span>▮▮▮</span>
                  <span>◜◝</span>
                  <span>▰▰▱</span>
                </div>
              </div>

              <div className="h-[calc(100%-44px)] overflow-y-auto p-5">{previewCard}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
