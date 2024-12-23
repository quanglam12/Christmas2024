// Cấu trúc câu hỏi rẽ nhánh
const questions = [
    {
        question: "Bạn đã đạt được những điều bạn mong muốn trong năm nay chưa?",
        options: [
            {
                text: "Yes",
                followUp: {
                    question: "Chúc mừng bạn, sự cố gắng của bạn đã được đền đáp xứng đáng. Bạn còn điều gì chưa kịp hoàn thành trong năm nay không?",
                    options: [
                        {
                            text: "Yes",
                            followUp: "Hãy lên kế hoạch hoàn thành nó vào năm sau nhé! Chúc bạn thành công!",
                        },
                        {
                            text: "No",
                            followUp: "Tuyệt vời! Bạn thực sự đã có một năm rất đáng tự hào!",
                        },
                    ],
                },
            },
            {
                text: "No",
                followUp: {
                    question: "Không sao đâu, bạn đã cố gắng nhiều rồi. Hãy tiếp tục vào năm sau nhé! Bạn có cảm thấy mình đã học được điều gì mới trong năm nay không?",
                    options: [
                        {
                            text: "Yes",
                            followUp: "Thật tuyệt! Học hỏi luôn là điều quý giá, hãy tiếp tục phát huy nhé!",
                        },
                        {
                            text: "No",
                            followUp: "Dù sao đi nữa, mỗi năm đều mang đến những trải nghiệm đáng giá. Hãy kiên nhẫn và mạnh mẽ hơn trong năm tới!",
                        },
                    ],
                },
            },
        ],
    },
];

// Biến lưu trạng thái hiện tại
let currentStep = questions[0];

// Hiển thị câu hỏi và tùy chọn
const questionSection = document.getElementById("question-section");
const optionsSection = document.getElementById("options-section");
const resultSection = document.getElementById("result");

function renderStep(step) {
    // Xóa nội dung cũ
    questionSection.innerHTML = "";
    optionsSection.innerHTML = "";

    // Hiển thị câu hỏi
    if (typeof step === "string") {
        resultSection.textContent = step;
        return;
    }

    questionSection.textContent = step.question;

    // Hiển thị các tùy chọn
    step.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option-button");
        button.style.margin = "5px";
        button.addEventListener("click", () => {
            if (typeof option.followUp === "string") {
                const resultDiv = document.getElementById("result");
                resultDiv.style.display = "block";
                resultDiv.scrollIntoView({ behavior: "smooth", block: "end" });
                resultSection.textContent = option.followUp;
            } else {
                renderStep(option.followUp);
            }
        });
        optionsSection.appendChild(button);
    });
}

// Bắt đầu từ bước đầu tiên
renderStep(currentStep);
