import React from "react";

const CreateRoomPage = () => {
  return (
    <div className="fixed inset-0 min-h-screen w-screen bg-[#f8f6f4] flex flex-col items-center justify-center z-[1000]">
      {/* ヘッダー */}
      <div className="fixed top-0 left-0 w-full h-20 bg-[#7B5858] flex justify-end items-center px-6 box-border">
        <button
          className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-md cursor-default"
          type="button"
          tabIndex={-1}
          aria-label="閉じる"
        >
          <span className="text-4xl text-[#7B5858] leading-none">
            ×
          </span>
        </button>
      </div>

      {/* フォーム */}
      <form className="mt-20 bg-[#FCFBFB99] border-1 border-[#7B5858] rounded-2xl px-12 py-12 min-w-[340px] max-w-[400px] w-[90vw] flex flex-col items-center box-border">
        <h2 className="text-[#7B5858] text-xl md:text-3xl font-medium mb-8 text-center">
          新しいルームを作る
        </h2>
        <div className="mb-6 w-full">
          <label className="text-[#7B5858] text-base block font-normal">
            ルーム名
          </label>
          <input
            className="w-full py-4 px-5 rounded-xl border-[0.4px] border-[#7B5858] bg-[#7B585880] text-[#FCFBFB] text-base mt-1 outline-none box-border placeholder-white placeholder-opacity-80"
            type="text"
            placeholder="名前を入力してください"
            value=""
            readOnly
          />
        </div>
        <div className="mb-6 w-full">
          <label className="text-[#7B5858] text-base block font-normal">
            詳細
          </label>
          <textarea
            className="w-full py-4 px-5 rounded-xl border-[0.4px] border-[#7B5858] bg-[#7B585880] text-[#FCFBFB] text-base mt-1 outline-none box-border placeholder-white placeholder-opacity-80"
            placeholder="どんなルームにしますか？"
            value=""
            readOnly
            rows={4}
          />
        </div>
        <button
          type="button"
          className="mt-6 bg-[#7d5c5c] border-none rounded-full w-14 h-14 flex items-center justify-center shadow-md cursor-default"
          tabIndex={-1}
        >
          <span className="text-white text-3xl leading-none">✔</span>
        </button>
      </form>
    </div>
  );
};

export default CreateRoomPage;
