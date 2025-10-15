function navBar() {
            let nav_Bar = document.getElementById("navLinks");
            nav_Bar.classList.toggle("show");
        }

        const grade_scale = [
            { min: 80, max: 100, letter: "A", point: 4.00 },
            { min: 75, max: 79.99, letter: "B+", point: 3.67 },
            { min: 70, max: 74.99, letter: "B", point: 3.33 },
            { min: 65, max: 69.99, letter: "B-", point: 3.00 },
            { min: 60, max: 64.99, letter: "C+", point: 2.67 },
            { min: 55, max: 59.99, letter: "C", point: 2.33 },
            { min: 50, max: 54.99, letter: "C-", point: 2.00 },
            { min: 45, max: 49.99, letter: "D+", point: 1.50 },
            { min: 40, max: 44.99, letter: "D", point: 1.00 },
            { min: 0, max: 39.99, letter: "F", point: 0.00 }
        ];

        let weight_options = { "Regular +0.0": 0, "Honors +0.5": 0.5, "AP/IB +1.0": 1, "Dual Enrollment +0.5": 0.5 };

        function Removefld(button) {
            button.closest(".fld").remove();
        }
        function check_box() {
            let checkBox = document.getElementById("check");
            let isChecked = checkBox.checked;
            if (isChecked == false) {
                document.querySelectorAll("#subject_weight").forEach(t => t.style.display = "none");
            }
            else {
                document.querySelectorAll("#subject_weight").forEach(t => t.style.display = "flex");
            }
        }

        function Add_Weights_Options() {
            let Selection = document.getElementById("input-container");
            for (let item in weight_options) {
                let option = document.createElement("option");
                option.innerText = item;
                option.value = item.value;
                Selection.lastElementChild.children[5].appendChild(option);
            };
        };


        function Add_Letters_Options() {
            let selection = document.getElementById("input-container");
            for (let item in grade_scale) {
                let option = document.createElement("option");
                option.innerText = grade_scale[item].letter;
                option.value = grade_scale[item].letter;
                selection.lastElementChild.children[2].appendChild(option);
            };
        };

        function Add_Letters_Options_Grade() {
            let selection = document.getElementById("cg_letter");
            for (let item in grade_scale) {
                let option = document.createElement("option");
                option.innerText = grade_scale[item].letter;
                option.value = grade_scale[item].letter;
                selection.appendChild(option);
            };
        };

        function Enable_Input_Type() {
            let inputtype = document.getElementById("input_types");
            let input_Type = ["letter", "point", "percent"];

            for (let i = 0; i < input_Type.length; i++) {
                if (inputtype.value != input_Type[i]) {
                    document.querySelectorAll("#subject_" + input_Type[i]).forEach(t => t.style.display = "none")
                    document.querySelectorAll("#cg_" + input_Type[i]).forEach(t => t.style.display = "none")
                }
                else {
                    document.querySelectorAll("#subject_" + input_Type[i]).forEach(t => t.style.display = "flex")
                    document.querySelectorAll("#cg_" + input_Type[i]).forEach(t => t.style.display = "flex")
                }
            }
        }



        Add_Weights_Options();
        Add_Letters_Options();
        Enable_Input_Type();
        check_box();
        Add_Letters_Options_Grade();


        function Add_Subject() {
            let inputContainer = document.getElementById("input-container");
            const Subject = document.createElement("div");
            Subject.className = "fld";
            Subject.innerHTML = `<input id="subject_name" type="text" title="Enter Subject Name (Optional)"
                                placeholder="Subj Name">
                            <input id="subject_hours" type="number" title="Enter Credit Hours"
                                placeholder="Creidt Hours e.g 5">
                            <select id="subject_letter" title="Select Grade"></select>
                            <input id="subject_point" type="number" title="Enter GPA of the Subject" placeholder="GPA e.g. 3.3"
                                style="display: none;">
                            <input id="subject_percent" type="number" title="Enter Percentage of Marks" placeholder="e.g 85%"
                                style="display: none;">
                            <select id="subject_weight" title="Select Weight"></select>
                            <button onclick="Removefld(this)">Remove</button>`;
            inputContainer.appendChild(Subject);
            Add_Weights_Options();
            Add_Letters_Options();
            Enable_Input_Type();
            check_box();
        }

        function Add_Semester() {
            let inputContainer = document.getElementById("CGPA_input-container");
            const Semester = document.createElement("div");
            Semester.className = "fld";
            Semester.innerHTML = `<input id="semester_name" type="text" title="Enter Subject Name (Optional)" placeholder="Semester">
                            <input id="semester_point" type="number" title="Enter GPA" placeholder="GPA e.g. 3.5">
                            <input id="semester_hour" type="number" title="Enter Credit Hours" placeholder="Credit Hours e.g. 15">
                            <button onclick="Removefld(this)">Remove</button>`;
            inputContainer.appendChild(Semester);
        }

        function openTool(toolId, btn) {
            document.querySelectorAll(".tool").forEach(t => t.style.display = "none");
            document.getElementById(toolId).style.display = "flex";
            document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }






        function Calculate_CGPA() {
            let totalPoints = 0;
            let totalCreditHours = 0;

            let semesters = document.querySelectorAll("#semester_point");
            let chours = document.querySelectorAll("#semester_hour");

            for (let i = 0; i < semesters.length; i++) {
                if (!isNaN(parseFloat(semesters[i].value))) {
                    if (!isNaN(parseFloat(chours[i].value))) {

                        totalPoints += parseFloat(semesters[i].value) * parseFloat(chours[i].value);
                        totalCreditHours += parseFloat(chours[i].value);

                    } else {
                        window.alert("Please enter a valid Credit Hourss (e.g., 15, 18).");
                        chours[i].focus();
                    }
                }
                else {
                    window.alert("Please enter a valid Grade Points (e.g., 3.5, 3.7, 4).");
                    semesters[i].focus();
                }
            }

            let cgpa = (totalPoints / totalCreditHours).toFixed(2);

            let label;
            if (cgpa <= 4.0) { label = `<span class="perfect" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Outstanding — perfect score!</span>`; }
            if (cgpa >= 3.5 && cgpa <= 3.9) {
                label = `<span class="excellent" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Excellent work — keep it up!</span>`;

            }
            if (cgpa >= 3.0 && cgpa <= 3.4) { label = `<span class="good" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Good performance — you are doing well.</span>`; }
            if (cgpa >= 2.5 && cgpa <= 2.9) { label = `<span class="average" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Average — there is room to improve.</span>`; }
            if (cgpa >= 2.0 && cgpa <= 2.4) { label = `<span class="below" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Below average — consider focusing study strategies.</span>`; }
            if (cgpa < 2.0) { label = `<span class="poor" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Poor — reach out for help and make a plan to improve.</span>`; }

            let show_result = document.getElementById("result_output");
            show_result.innerHTML = `<p style="display: flex; flex-direction: column; gap: 8px;"><b>Your</b> <strong style="font-size: 25px; font-weight: 700;">CGPA is ${cgpa}</strong> ${label}</p>`

        }


        function Calculate_GPA() {
            let totalPoints = 0;
            let totalCreditHours = 0;

            let inputType = document.getElementById("input_types").value;
            let ch = document.querySelectorAll("#subject_hours");


            if (inputType === "letter") {
                for (let i = 0; i < ch.length; i++) {
                    let grade_point = document.querySelectorAll("#subject_letter");
                    if (!isNaN(parseFloat(ch[i].value))) {
                        for (let j = 0; j < grade_scale.length; j++) {
                            if (grade_scale[j].letter === grade_point[i].value) {
                                totalPoints += parseFloat(ch[i].value) * parseFloat(grade_scale[j].point);
                                totalCreditHours += parseFloat(ch[i].value)
                            }
                        }
                    }
                    else {
                        window.alert("Please enter a valid Credit Hours (e.g., 1, 2, 3.3).");
                        ch[i].focus();
                    }

                }

            } else if (inputType === "subject_percentage") {
                for (let i = 0; i < ch.length; i++) {
                    let grade_point = document.querySelectorAll("#subject_percentage");
                    if (!isNaN(parseFloat(ch[i].value))) {
                        if (!isNaN(parseFloat(grade_point[i].value))) {

                            for (let grade of grade_scale) {
                                if (grade_point[i].value >= grade.min && grade_point[i].value <= grade.max) {
                                    totalPoints += parseFloat(ch[i].value) * parseFloat(grade.point);
                                    totalCreditHours += parseFloat(ch[i].value)
                                }
                            }

                        }
                        else {
                            window.alert("Please enter a valid Grade Point (e.g., 1, 2, 3.3).");
                            grade_point[i].focus();
                        }
                    }
                    else {
                        window.alert("Please enter a valid Credit Hours (e.g., 1, 2, 3.3).");
                        ch[i].focus();
                    }

                }
            }
            else {
                for (let i = 0; i < ch.length; i++) {
                    let grade_point = document.querySelectorAll("#subject_grade_point");
                    if (!isNaN(parseFloat(ch[i].value))) {
                        if (!isNaN(parseFloat(grade_point[i].value))) {
                            totalPoints += parseFloat(ch[i].value) * parseFloat(grade_point[i].value);
                            totalCreditHours += parseFloat(ch[i].value)
                        }
                        else {
                            window.alert("Please enter a valid Grade Point (e.g., 1, 2, 3.3).");
                            grade_point[i].focus();
                        }
                    }
                    else {
                        window.alert("Please enter a valid Credit Hours (e.g., 1, 2, 3.3).");
                        ch[i].focus();
                    }

                }
            }

            let cgpa = (totalPoints / totalCreditHours).toFixed(1);

            let label;
            if (cgpa <= 4.0) {
                label = `<span class="perfect" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Outstanding — perfect score!</span>`;

            }
            if (cgpa >= 3.5 && cgpa <= 3.9) { label = `<span class="excellent" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Excellent work — keep it up!</span>`; }
            if (cgpa >= 3.0 && cgpa <= 3.4) { label = `<span class="good" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Good performance — you are doing well.</span>`; }
            if (cgpa >= 2.5 && cgpa <= 2.9) { label = `<span class="average" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Average — there is room to improve.</span>`; }
            if (cgpa >= 2.0 && cgpa <= 2.4) { label = `<span class="below" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Below average — consider focusing study strategies.</span>`; }
            if (cgpa < 2.0) { label = `<span class="poor" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Poor — reach out for help and make a plan to improve.</span>`; }

            let show_result = document.getElementById("result_output");
            show_result.innerHTML = `<p style="display: flex; flex-direction: column; gap: 5px;"><b>Your</b> <strong style="font-size: 25px; font-weight: 700;">GPA is ${cgpa}</strong> <b style="text-align: end;"></b>${label}</p> `
        }


        function Convert_Grade() {
            let inputType = document.getElementById("input_types").value;

            let data;

            if (inputType === "letter") {

                for (i in grade_scale) {
                    if (document.getElementById("cg_letter").value === grade_scale[i].letter) {
                        data = grade_scale[i];
                    }
                }
            }
            else if (inputType === "percent") {
                for (i in grade_scale) {
                    if (parseFloat(document.getElementById("cg_percent").value) >= grade_scale[i].min && parseFloat(document.getElementById("cg_percent").value) <= grade_scale[i].max) {
                        data = grade_scale[i];
                    }
                }
            }
            else {
                let userPoint = document.getElementById("cg_point").value;
                let exactMatch = grade_scale.find(g => g.point === userPoint);
                if (exactMatch) data = exactMatch;

                let nearest = grade_scale.reduce((prev, curr) => {
                    return Math.abs(curr.point - userPoint) < Math.abs(prev.point - userPoint)
                        ? curr
                        : prev;
                });
                data = nearest;
            }


            let label;
            if (data.point <= 4.0) {
                label = `<span class="perfect" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Outstanding — perfect score!</span>`;

            }
            if (data.point >= 3.5 && data.point <= 3.9) { label = `<span class="excellent" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Excellent work — keep it up!</span>`; }
            if (data.point >= 3.0 && data.point <= 3.4) { label = `<span class="good" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Good performance — you are doing well.</span>`; }
            if (data.point >= 2.5 && data.point <= 2.9) { label = `<span class="average" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Average — there is room to improve.</span>`; }
            if (data.point >= 2.0 && data.point <= 2.4) { label = `<span class="below" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Below average — consider focusing study strategies.</span>`; }
            if (data.point < 2.0) { label = `<span class="poor" style="color: white; padding: 5px 15px; border-radius: 5px; width: fit-content;">Poor — reach out for help and make a plan to improve.</span>`; }

            let show_result = document.getElementById("result_output");
            show_result.innerHTML = `<p style="display: flex; flex-direction: column; gap: 5px;"><b>Your</b> <strong style="font-size: 25px; font-weight: 700;">GPA is ${data.point}</strong><span>Your Grade =<b> ${data.letter} </b> | Percentage <b>${data.min}% </b> to <b>${data.max}% </b></span> ${label}</p> `

        }