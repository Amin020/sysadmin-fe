import * as Survey from 'survey-angular';
// import * as Ko from 'survey-knockout';
import * as ko from 'knockout';
import * as toolBox from './../app/builder/shared/data/tool-box-data/tool-box';

// console.log('test')
console.log(Survey);
console.log(Survey.SurveyWindow)
// console.log(Ko);

window.ko = ko;

console.log(ko);
// ko._dragged;
// ko._index = 0;
// ko._dropped;
// ko.bindingHandlers['drag'] = {
//     init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

//         var dragElement = element;
//         dragElement.draggable = true;
//         dragElement.ondragstart = function (data) {
//             event.stopPropagation();
//             event.dataTransfer.setData('data', JSON.stringify(data));
//             ko._dragged = ko.utils.unwrapObservable(valueAccessor().value);
//         }
//     }
// };

// ko.bindingHandlers['dragenter'] = {
// init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

//     var overElement = element;
//     overElement.ondragenter = function (event) {
//         event.preventDefault();
//         var value = ko.utils.unwrapObservable(valueAccessor().value);

//         if (ko._dropped) {
//             if (ko._dropped.getType() == 'survey') {
//                 ko._index = ko._dropped.currentPage.elements.findIndex(function (v) { return v == value })
//             } else if (ko._dropped.getType() == 'panel') {
//                 ko._index = ko._dropped.elements.findIndex(function (v) { return v == value })
//             } else {
//                 ko._index = 0;
//             }
//         }
//     }
// }
// }


// ko.bindingHandlers['drop'] = {
// init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
//     var dropElement = element;
//     dropElement.ondragover = function (event) {
//         event.preventDefault();
//         ko._dropped = ko.utils.unwrapObservable(valueAccessor().value);
//     }

//     dropElement.ondrop = function (event, ui) {
//         event.preventDefault();
//         event.stopPropagation();
//         var dropPlace = ko.utils.unwrapObservable(valueAccessor().value);

//         var dragType = JSON.parse(event.dataTransfer.getData('data'));
//         const type = dropPlace.getType();
//         if (type == 'panel' ) {
//             if (ko._dragged) {
//                 dropPlace.page.removeElement(ko._dragged);
//                 dropPlace.addElement(ko._dragged, ko._index);
//                 dropPlace.onQuestionAdded.fire(this);
//             } else if (dragType) {
//                 if (dragType.includes('panel')) {
//                     dropPlace.addNewPanel(dragType);
//                     dropPlace.onPanelAdded.fire(this);
//                 } else {
//                     dropPlace.addNewQuestion(dragType);
//                     dropPlace.onQuestionAdded.fire(this);
//                 }
//             }

//         }else if(type=='paneldynamic'){
//             if (ko._dragged) {
//                 dropPlace.page.removeElement(ko._dragged);
//                 dropPlace.addElement(ko._dragged, ko._index);
//                 dropPlace.onQuestionAdded.fire(this);
//             } else if (dragType) {
//                 if (dragType.includes('panel')) {
//                     dropPlace.addNewQuestion(dragType);
//                     dropPlace.onPanelAdded.fire(this);
//                 } else {
//                     dropPlace.addNewQuestion(dragType);
//                     dropPlace.onQuestionAdded.fire(this);
//                 }
//             }
//         } else {
//             if (dragType) {
//                 if (dragType.type=='panel') {
//                     dropPlace.currentPage.addNewPanel(dragType);
//                     dropPlace.onPanelAdded.fire(this);
//                 } else {
//                     dropPlace.currentPage.addNewQuestion(dragType);
//                     dropPlace.onQuestionAdded.fire(this);
//                 }
//             } else if (ko._dragged) {
//                 dropPlace.currentPage.removeElement(ko._dragged);
//                 dropPlace.currentPage.addElement(ko._dragged, ko._index);
//                 dropPlace.onQuestionAdded.fire(this);
//             }
//         }
//         console.log('drop ', event)


//     }

// }
// };
// ko.bindingHandlers["sortableList"] = {
//     init: function (element, valueAccessor) {
//         var list = valueAccessor();
//         $(element).sortable({
//             update: function (event, ui) {
//                 //retrieve our actual data item
//                 var item = ui.item.tmplItem().data;
//                 //figure out its new position
//                 var position = ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);
//                 //remove the item and add it back in the right spot
//                 if (position >= 0) {
//                     list.remove(item);
//                     list.splice(position, 0, item);
//                 }
//                 ui.item.remove();
//             }
//         });
//     }
// };

// ko.bindingHandlers["visibleAndSelect"] = {
//     update: function (element, valueAccessor) {
//         ko.bindingHandlers.visible.update(element, valueAccessor);
//         if (valueAccessor()) {
//             setTimeout(function () {
//                 $(element).focus().select();
//             }, 0); //new tasks are not in DOM yet
//         }
//     }
// }

Survey.SurveyModel.prototype.onElementSelected = new Survey.Event();
Survey.SurveyModel.prototype.onElementEdit = new Survey.Event();

Survey.SurveyModel.prototype.updateCurrentPageQuestions = function () {
    var questions = this.currentPage ? this.currentPage.questions : [];
    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        if (q.visible) {
            // fix image picker
            console.log(q)
            if (q["updateQuestion"]) {
                q["updateQuestion"]();
            }
        }

    }
};

Survey.SurveyModel.prototype.generateNewProp = function (elements, prop, baseName) {
    var keys = {};
    for (var i = 0; i < elements.length; i++)
        keys[elements[i][prop]] = true;
    var index = 1;
    while (keys[baseName + index])
        index++;
    return baseName + index;
};

var getSurvey = function (el) {
    if (!el)
        return null;
    var res = el["survey"];
    if (res)
        return res;
    return el["data"];
}


// TODO : need to move these commented lines here 

// Survey.Question.prototype.active =  new ko.observable(false);
// Survey.Question.prototype.activeItem =  new ko.observable();
// Survey.Question.prototype.activeTitle =   new ko.observable();
// Survey.Question.prototype.activeEditTitle =   new ko.observable();
// Survey.Question.prototype.activeEditItem =   new ko.observable();

var deactivateElement = function (element) {
    if (element.getType() != 'panel') {
        return element.active(false);
    } else {
        element.active(false);
        for (var i = 0; i < element.elements.length; i++) {
            var item = element.elements[i];
            deactivateElement(item);
        }

    }
}

var deactivateElements = function (data) {
    var survey = getSurvey(data);
    for (var i = 0; i < survey.currentPage.elementsValue.length; i++) {
        var item = survey.currentPage.elementsValue[i];
        deactivateElement(item);
    }
    data.active(true);
}

Survey.Question.prototype.questionClick = function (data) {
    event.stopPropagation();
    data.activeEditItem();
    var survey = getSurvey(this);
    // for (var i = 0; i < survey.currentPage.elementsValue.length; i++) {
    //     var item = survey.currentPage.elementsValue[i];
    //     item.active(false)
    // }
    // data.active(true);
    deactivateElements(this);
    survey.onElementSelected.fire(this);
};

var checkRateStep = function (array, rateStep) {
    var values = JSON.parse(JSON.stringify(array));
    for (var i = 0; i < values.length; i++) {
        if (values[i + 1] != undefined) {
            if (values[i + 1].value - values[i].value != rateStep) {
                return false;
            }
        }
    }
    return true;
}

var addRatingItem = function (data) {
    var rateStepCond = checkRateStep(data.visibleRateValues, data.rateStep);
    var name;
    var values = JSON.parse(JSON.stringify(data.visibleRateValues));
    if (rateStepCond) {
        name = +data.visibleRateValues[data.visibleRateValues.length - 1].value + +data.rateStep;

    } else {
        name = data.data.generateNewProp(data.visibleRateValues, 'value', 'item');
    }

    values.push({ value: name });

    if (data.rates.length != 0) {
        data.rates.length = 0;
    }
    for (var i = 0; i < values.length; i++) {
        var item = Survey.Base.createItemValue(JSON.parse(JSON.stringify(values[i])));
        data.rates.push(item)
    }

}

Survey.Question.prototype.addNewItem = function (data) {

    var itemCopy = {};
    itemCopy = Survey.Base.createItemValue({});

    if (data.getType() == 'rating') {
        // TODO need to revisit this
        // var length = data.visibleRateValues.length + 1;
        // var values = JSON.parse(JSON.stringify(data.visibleRateValues));
        // values.push({ value: length });

        // if (data.rates.length != 0) {
        //     data.rates.length = 0;
        // }
        // for (var i = 0; i < values.length; i++) {
        //     var item = Survey.Base.createItemValue(JSON.parse(JSON.stringify(values[i])));
        //     data.rates.push(item)
        // }
        addRatingItem(data);

    } else {
        var length = data.choices.length + 1;
        itemCopy.value = 'item' + length;
        data.choices.push(itemCopy);
    }
};


Survey.Question.prototype.deleteItem = function (index, item) {

    if (this.getType() == 'rating') {
        var data = this;
        var values = JSON.parse(JSON.stringify(this.visibleRateValues));
        var valuesE = values.splice(index(), 1);

        if (data.rates.length != 0) {
            data.rates.length = 0;
        }
        for (var i = 0; i < values.length; i++) {
            var item = Survey.Base.createItemValue(JSON.parse(JSON.stringify(values[i])));
            data.rates.push(item)
        }

    } else {
        this.choices.splice(index(), 1);
    }
};

Survey.Question.prototype.editItem = function (index, item) {
    index = typeof index == 'string' ? index : index();
    if (this.active()) {
        this.activeEditItem(index);
    }
};

Survey.Question.prototype.editItemText = function (data) {
    this.text = data.value
    this.activeEditItem(undefined);
};




Survey.Question.prototype.itemHover = function (index, code, itemValue) {
    index = typeof index == 'string' ? index : index();
    if (this.active()) {
        if (code == 'a') {
            this.activeItem(index);
        } else if (code == 'e') {
            if (event.toElement && (event.toElement.classList[0] == 'items-control' || event.toElement.classList[0] == 'item-c')) {
                return;
            }
            this.activeItem(undefined);
        }
    }
};


Survey.Question.prototype.titleHover = function (question, code, data) {

    if (this.active()) {
        if (code == 'a') {
            question.activeTitle(data.visibleIndex);
        } else if (code == 'e') {

            if (event.toElement && event.toElement.classList[0] == 'survey-question-title-edit') {
                return;
            }
            if (question.activeTitle() != undefined) {
                question.activeTitle(undefined);
            }
        }
    }
};

Survey.Question.prototype.editTitle = function (data) {
    data.activeEditTitle(data.visibleIndex);
    data.activeTitle(undefined);
};

Survey.Question.prototype.mouseout = function (data) {
    if (data.active()) {
        data.activeTitle(undefined);
        data.activeEditTitle(undefined);
    }
};

Survey.Question.prototype.editItemTitle = function (data) {
    // console.log(data);
    if (this.active()) {
        data.activeTitle(undefined);
        data.activeEditTitle(undefined);
    }
};

Survey.Question.prototype.questionCopy = function (data) {
    var survey = getSurvey(data);

    // var questionIndex = survey.currentPage.questions.length == 0 ? 0 : survey.currentPage.questions.length;
    // var newQuestion = survey.currentPage.addNewQuestion(_question.getType(), 'question' + questionIndex);
    var newQuestion = survey.currentPage.addNewQuestion(data.getType(), survey.generateNewName(survey.currentPage.elements, data.name + '_copy'));
    newQuestion.updateQuestion();
    localStorage.setItem('surveyArray', JSON.stringify(survey.toJSON()));
};

Survey.Question.prototype.questionEdit = function (data) {
    var survey = getSurvey(data);
    survey.onElementEdit.fire(data);
};

Survey.Question.prototype.questionRemove = function (data) {
    var survey = getSurvey(this);
    survey.currentPage.removeElement(data);
    localStorage.setItem('surveyArray', JSON.stringify(survey.toJSON()));
};

Survey.Question.prototype.addToToolBox = function (data) {
    console.log(data.toJSON());
    var originalElement;
    var survey = getSurvey(data);
    var surveyModel = JSON.parse(localStorage.getItem('surveyArray'));
    surveyModel.pages.forEach(page => {
        if (page['elements'] != null) {
            page.elements.forEach((questionEle, indexx) => {
                if (questionEle.name == data.name || questionEle.name == data.title) {
                    originalElement = questionEle;
                }
            });
        }
    });

    toolBox.default.toolBoxItems.push(originalElement);
    var length = toolBox.default.toolBoxItems.length - 1;
    toolBox.default.toolBoxItems[length]['id'] = length;
    toolBox.default.toolBoxItems[length]['text'] = survey.generateNewName(survey.currentPage.questions, data.name + '_custom');
    // toolBox.default.toolBoxItems[length]['name'] = toolBox.default.toolBoxItems[length]['text']
    toolBox.default.toolBoxItems[length]['type'] = data.getType();
    toolBox.default.toolBoxItems[length]['icon'] = 'fa fa-retweet'
}
Survey.Question.prototype.toggleTitle = function (data) {
    var survey = getSurvey(data);
    survey.currentPage.questions.forEach((questionEle, indexx) => {
        if (questionEle.name == data.name || questionEle.name == data.title) {
            if (this.titleLocation == 'hidden') {
                this.titleLocation = 'default';
            } else {
                this.titleLocation = 'hidden'
            }
            questionEle['titleLocation'] = this.titleLocation;
        }
    });
    localStorage.setItem('surveyArray', JSON.stringify(survey.toJSON()));
};
Survey.Question.prototype.getSelectBoxData = function () {
    const type = this.getType();
    return type;
}
Survey.Question.prototype.permissionChanged = function (data, evt, val) {
    var type = data.getType();
    var newType;
    if (type == 'text' || type == 'comment') {
        newType = getCommentTextId(evt.target.selectedIndex);
    } else {
        newType = getCurrentItemById(evt.target.selectedIndex);
    }
    var question = convertObject(data, newType);
    var survey = getSurvey(data);
    localStorage.setItem('surveyArray', JSON.stringify(survey.toJSON()));
}
var getCommentTextId = function (id) {
    switch (id) {
        case 0:
            return 'text'
        case 1:
            return 'comment'
    }
}
var getCurrentItemById = function (id) {
    switch (id) {
        case 0:
            return 'checkbox'

        case 1:
            return 'dropdown'

        case 2:
            return 'radiogroup'

        case 3:
            return 'imagepicker'


        default:
            return 'checkbox';
    }
}
var convertObject = function (
    obj,
    convertToClass
) {
    if (!obj || !obj.parent || convertToClass == obj.getType()) return null;
    var newQuestion = Survey.QuestionFactory.Instance.createQuestion(
        convertToClass,
        obj.name
    );
    var jsonObj = new Survey.JsonObject();
    var json = jsonObj.toJsonObject(obj);
    jsonObj.toObject(json, newQuestion);
    var panel = obj.parent;
    var index = panel.elements.indexOf(obj);
    panel.removeElement(obj);
    panel.addElement(newQuestion, index);
    return newQuestion;
}
Survey.Question.prototype.questionRequired = function (data) {
    var survey = getSurvey(data);
    survey.currentPage.questions.forEach((questionEle, indexx) => {
        if (questionEle.name == data.name || questionEle.name == data.title) {
            this.isRequired = !this.isRequired;
            questionEle['isRequired'] = this.isRequired;
        }
    });
    localStorage.setItem('surveyArray', JSON.stringify(survey.toJSON()));
};

Survey.Question.prototype.activeEditChoices = function (data) {
    // this.isRequired = !this.isRequired;
    console.log(data);
    var value = data.activeChoice();
    data.activeChoice(!value);
};

// Survey.Panel.prototype.addToToolBox = function (data) {

//     var _question = data;
//     var survey = getSurvey(_question);

//     toolBox.default.toolBoxItems.push(data);
//     var length = toolBox.default.toolBoxItems.length
//     toolBox.default.toolBoxItems[length - 1]['id'] = length - 1;
//     toolBox.default.toolBoxItems[length - 1]['text'] = survey.generateNewName(survey.currentPage.questions, _question.name)
//     toolBox.default.toolBoxItems[length - 1]['type'] = data.getType();
//     toolBox.default.toolBoxItems[length - 1]['icon'] = 'fa fa-retweet'
// }
// Survey.Panel.prototype.panelClick = function (data) {
//     // console.log(data);
//     var survey = getSurvey(this);
//     // for (var i = 0; i < survey.currentPage.elementsValue.length; i++) {
//     //     var item = survey.currentPage.elementsValue[i];
//     //     item.active(false)
//     // }
//     deactivateElements(this);
//     this.active(true);
//     survey.onElementSelected.fire(this);
// };

var copyQuestion = function (newPanel, question) {
    var newQuestion = newPanel.addNewQuestion(question.getType(), question.name + '_copy');
    var oldObj = JSON.parse(JSON.stringify(question));
    for (var key in oldObj) {
        if (oldObj.hasOwnProperty(key)) {
            if (key == 'name') {
                continue;
            }
            newQuestion[key] = JSON.parse(JSON.stringify(oldObj[key]));;
            console.log(key + " -> " + oldObj[key]);
        }
    }
    newQuestion.updateQuestion();
}

// Survey.Panel.prototype.panelCopy = function (data) {


//     var _panel = this;
//     var survey = getSurvey(_panel);
//     var newPanel = survey.currentPage.addNewPanel(survey.generateNewName(survey.currentPage.elements, _panel.name + '_copy'));
//     var oldObj = JSON.parse(JSON.stringify(_panel));
//     for (var key in oldObj) {
//         if (oldObj.hasOwnProperty(key)) {
//             if (key == 'name') {
//                 continue;
//             }
//             if (key == 'elements') {
//                 var elements = _panel.elements;
//                 for (var i = 0; i < elements.length; i++) {
//                     var element = elements[i];
//                     var type = element.getType();
//                     if (type !== 'panel') {
//                         copyQuestion(newPanel, element);
//                     }
//                 }
//                 continue;
//             }
//             newPanel[key] = JSON.parse(JSON.stringify(oldObj[key]));;
//             console.log(key + " -> " + oldObj[key]);
//         }
//     }

// };

// Survey.Panel.prototype.panelEdit = function (data) {
//     var survey = getSurvey(this);
//     survey.onElementEdit.fire(this);
// };

// Survey.Panel.prototype.panelRemove = function (data) {
//     var survey = getSurvey(this);
//     if (this.page) {
//         survey.currentPage = this.page;
//         this.page.removeElement(this);
//     }
// };

// Survey.Panel.prototype.panelRequired = function (data) {
//     this.isRequired = !this.isRequired;
// };
/////////////////////////////////////////////////////////
// overwrite add row function 
// TODO: check the problem , why canAddrow is always false
// Survey.QuestionMatrixDynamicModel.prototype.addRow = function () {
//     var options = { question: this, canAddRow: true };
//     if (!!this.survey) {
//         this.survey.matrixBeforeRowAdded(options);
//     }
//     if (!options.canAddRow)
//         return;
//     var prevRowCount = this.rowCount;
//     this.rowCount = this.rowCount + 1;
//     var defaultValue = this.getDefaultRowValue(true);
//     if (!this.isValueEmpty(defaultValue)) {
//         var newValue = this.createNewValue();
//         if (newValue.length == this.rowCount) {
//             newValue[newValue.length - 1] = defaultValue;
//             this.value = newValue;
//         }
//     }
//     if (this.data) {
//         this.runCellsCondition(this.getDataFilteredValues(), this.getDataFilteredProperties());
//     }
//     if (this.survey) {
//         if (prevRowCount + 1 == this.rowCount) {
//             this.survey.matrixRowAdded(this);
//             this.fireCallback(this.visibleRowsChangedCallback);
//         }
//     }
// };


// Survey.QuestionMatrixDynamicModel.prototype.removeRow = function (index) {
//     // if (!this.canRemoveRow)
//     //     return;
//     if (index < 0 || index >= this.rowCount)
//         return;
//     if (this.survey) {
//         var row = this.generatedVisibleRows
//             ? this.generatedVisibleRows[index]
//             : null;
//         this.survey.matrixRowRemoved(this, index, row);
//     }
//     if (this.generatedVisibleRows && index < this.generatedVisibleRows.length) {
//         this.generatedVisibleRows.splice(index, 1);
//     }
//     if (this.value) {
//         var val = this.createNewValue();
//         val.splice(index, 1);
//         val = this.deleteRowValue(val, null);
//         this.isRowChanging = true;
//         this.value = val;
//         this.isRowChanging = false;
//     }
//     this.rowCountValue--;
//     this.fireCallback(this.visibleRowsChangedCallback);
// };
///////////////////////Image Picker //////////////////

export default Survey;