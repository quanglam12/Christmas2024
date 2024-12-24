// Cấu trúc câu hỏi rẽ nhánh
const questions = [
    {
        question: "Bạn đã đạt được những điều bạn mong muốn trong năm nay chưa?",
        options: [
            {
                text: "Rồi",
                followUp: {
                    question: "Chúc mừng bạn, sự cố gắng của bạn đã được đền đáp xứng đáng. Bạn có điều gì chưa kịp hoàn thành trong năm nay mà vẫn mong muốn thực hiện không?",
                    options: [
                        {
                            text: "Vẫn còn",
                            followUp: {
                                question: "Hãy chia sẻ thêm về điều đó. Điều gì đã khiến bạn chưa thể hoàn thành? Bạn nghĩ điều gì có thể giúp bạn đạt được nó vào năm sau?",
                                options: [
                                    {
                                        text: "Có kế hoạch rồi",
                                        followUp: "Thật tuyệt! Hãy bám sát kế hoạch của mình nhé. Chúc bạn sẽ đạt được kết quả tốt nhất!",
                                    },
                                    {
                                        text: "Chưa có kế hoạch",
                                        followUp: "Không sao cả. Hãy dành chút thời gian để lập kế hoạch. Nếu bạn cần trợ giúp, hãy thử bắt đầu từ những bước nhỏ.",
                                    },
                                ],
                            },
                        },
                        {
                            text: "Không",
                            followUp: "Thật tuyệt! Bạn thực sự đã có một năm rất đáng tự hào. Điều gì khiến bạn cảm thấy hạnh phúc nhất trong năm nay?",
                        },
                    ],
                },
            },
            {
                text: "Vẫn chưa",
                followUp: {
                    question: "Không sao đâu, bạn đã cố gắng nhiều rồi. Bạn có gặp thử thách khó khăn trong năm nay?",
                    options: [
                        {
                            text: "Có",
                            followUp: {
                                question: "Cảm ơn bạn đã chia sẻ. Bạn nghĩ mình đã học được bài học gì từ thử thách này?",
                                options: [
                                    {
                                        text: "Học được bài học mới",
                                        followUp: "Thật tuyệt vời! Học hỏi từ những khó khăn sẽ giúp bạn mạnh mẽ hơn. Hãy áp dụng bài học này vào năm sau nhé!",
                                    },
                                    {
                                        text: "Vẫn chưa",
                                        followUp: "Không sao cả. Đôi khi bài học cần thời gian để thấm. Hãy dành thời gian nhìn lại, và bạn sẽ thấy mình đã trưởng thành hơn.",
                                    },
                                ],
                            },
                        },
                        {
                            text: "Không có thử thách lớn",
                            followUp: "Điều đó cũng tốt mà! Hãy cố gắng vào năm tiếp theo nhé!",
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
                const rect = resultDiv.getBoundingClientRect();
                const scrollOffset = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
                window.scrollTo({ top: scrollOffset, behavior: "smooth" });

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
