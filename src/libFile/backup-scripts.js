<script type="text/html" id="survey-page">
  <div data-bind="css: data.css.page.root,   drop: {value: data}"> 
      <h4 data-bind="visible: (processedTitle.length > 0) && data.showPageTitles, css: data.css.pageTitle"> 
        <!-- ko template: { name: 'survey-string', data: locTitle } --> 
        <!-- /ko --> 
      </h4>  
      <div data-bind="css: data.css.pageDescription"> 
        <!-- ko template: { name: 'survey-string', data: locDescription } --> 
        <!-- /ko --> 
      </div> 
      <!-- ko template: { name: 'survey-rows', data: $data} -->
      <!-- /ko --> 
  </div>
</script>

<script type="text/html" id="survey-panel">
  <div  data-bind="style:{ width: renderWidth }, attr: {id: id}, css: cssClasses.panel.container,drag: {value: $data}, dragenter:{value: $data}, drop:{value: $data}, css: active() == true ? 'active' : ''"> 
      <!-- ko if: active()==true && survey.isDesignMode-->
        <div > 
           <div  class="survey-header">  
             <div class="survey-header-item" data-bind=" click: panelEdit.bind($data) ">Edit</div> 
             <div class="survey-header-item" data-bind=" click: panelCopy.bind($data) ">Copy</div>
             <div class="survey-header-item" data-bind=" click: panelRemove.bind($data) " >Delete </div>
             <div class="survey-header-item" data-bind="click: addToToolBox.bind($data)">+toolbox</div>
             <div class="survey-header-item" data-bind=" click: panelRequired.bind($data) ">is required</div> 
             </div>
        </div> 
      <!-- /ko -->
        <div  data-bind="style:{ width: renderWidth }, attr: {id: id},click: panelClick.bind($data), css: cssClasses.panel.container">   
          <h4 data-bind="css: $data.getTitleStyle(), click: doExpand"> 
            <!-- ko template: { name: 'survey-string', data: locTitle } -->    <!-- /ko -->  
              <span class="sv_panel_icon" data-bind="visible: koIsCollapsed() || koIsExpanded(), css: {sv_expanded: !koIsCollapsed()}"></span> 
          </h4>  
          <div data-bind="css: cssClasses.panel.description"> 
            <!-- ko template: { name: 'survey-string', data: locDescription } -->
            <!-- /ko -->   
          </div> 
            <!-- ko template: { name: 'survey-question-errors', data: $data } -->        <!-- /ko --> 
          <div data-bind="visible: !koIsCollapsed(), style: { paddingLeft: innerPaddingLeft}"> 
            <!-- ko template: { name: 'survey-rows', data: $data} -->            <!-- /ko --> 
          </div>
        </div>
      </div>
</script>
<script type="text/html" id="survey-question">
  <div  class="sv_qstn" 
  data-bind="drag: {value: $data}, dragenter:{value: $data},css: question.koRootClass, style: { paddingLeft: question.paddingLeft, paddingRight: question.paddingRight, width: question.renderWidth }, attr: {id: question.id}, css: question.active()== true && question.isDesignMode ? 'active' : ''">     
  <!-- ko if: question.active()==true && question.survey.isDesignMode--> 
  <div> 
    <div class="survey-header">  
      <!-- <i class="item-icon fa-text-height" aria-hidden="true"></i> -->
      <div class="survey-header-item" data-bind="click: question.questionEdit.bind($data)">Edit</div> 
      <div class="survey-header-item" data-bind="click: question.questionCopy.bind($data)">Copy</div>  
      <div class="survey-header-item" data-bind="click: question.questionRemove.bind($data)" >Delete </div> 
      <div class="survey-header-item" data-bind="click: question.toggleTitle.bind($data)" > show/hide title</div>  
      <div class="survey-header-item" data-bind="click: question.addToToolBox.bind($data)">+toolbox</div>
      <div class="survey-header-item" data-bind="click: question.questionRequired.bind($data)">is required</div>   
    </div>  
  </div> 
  <!-- /ko --> 
  <div data-bind="css: question.koRootClass,click: question.questionClick.bind($data), style: { paddingLeft: question.paddingLeft, paddingRight: question.paddingRight, width: question.renderWidth }, attr: {id: question.id}">        
    <div data-bind="css: {'title-left': question.hasTitleOnLeft}"> 
      <!-- ko if: question.hasTitleOnLeftTop -->
        <!--ko template: { name: 'survey-question-title', data: question  } -->
        <!-- /ko --> 
      <!-- /ko --> 
    </div> 
  <div data-bind="css: {'content-left': question.hasTitleOnLeft}">        
    <!-- ko if: question.errorLocation == 'top' -->      
      <!-- ko template: { name: 'survey-question-errors', data: question } -->  
      <!-- /ko -->   
    <!-- /ko -->   
      <!-- ko template: { name: question.koTemplateName(), data: question, afterRender: question.koQuestionAfterRender } -->     
    <!-- /ko -->      
  <div class="form-group" data-bind="visible: question.hasComment">   
    <div data-bind="text:question.commentText"></div>
    <div data-bind="template: { name: 'survey-comment', data: {'question': question, 'visible': true } }"></div>    
  </div>     
  <!-- ko if: question.errorLocation == 'bottom' -->   
    <!-- ko template: { name: 'survey-question-errors', data: question } --> 
    <!-- /ko -->  
  <!-- /ko --> 
    <!-- ko if: question.hasTitleOnBottom -->
    <!--ko template: { name: 'survey-question-title', data: question  } -->  
    <!-- /ko -->    
  <!-- /ko -->  
  </div>  
  </div>
  </div>
  </script>

<script type="text/html" id="survey-question-title">
  <h5 class="survey-question-title" data-bind=" css: koCss().title , event:{ mouseover: question.titleHover.bind($parent , $data,'a' ), mouseout: question.titleHover.bind($parent , $data ,'e' )}">  
      <!-- ko if: question.activeEditTitle() != $data.visibleIndex-->
        <div >
          <!-- ko template: { name: 'survey-string', data: locTitle } -->
          <!-- /ko --> 
        </div> 
      <!--/ko-->   
      <!-- ko if: question.activeEditTitle() == $data.visibleIndex--> 
        <input class="survey-question-title-input" data-bind=" event: { blur: question.editItemTitle.bind($parent)}, value: $data.title, valueUpdate: 'afterkeydown' " autofocus /> 
      <!--/ko-->
      <!-- ko if: question.activeTitle() == $data.visibleIndex && survey.isDesignMode--> 
        <span class="survey-question-title-edit" data-bind="click: question.editTitle.bind($data, $data)"> Edit </span> 
      <!--/ko-->
  </h5>    
  <div data-bind="visible: !locDescription.isEmpty, css: koCss().description"> 
      <!-- ko template: { name: 'survey-string', data: locDescription } --><!-- /ko --> 
  </div> 
</script>
<script type="text/html" id="survey-question-checkbox">
  <fieldset data-bind="css: question.koCss().root">      
    <legend data-bind="attr: { 'aria-label': question.locTitle.renderedHtml }"></legend>      
    <!-- ko ifnot: question.hasColumns  -->        
    <!-- ko foreach: { data: question.visibleChoices,sortableList:question.visibleChoices,  as: 'item', afterRender: question.koAfterRender}  --> 
    <div class="item-container" data-bind="event: { mouseover: question.itemHover.bind($parent , $index, 'a'), mouseout: question.itemHover.bind($parent , $index , 'e') ,css: question.getItemClass(item)}"> 
        <label data-bind="css: question.koCss().label"> 
          <!-- ko if: item == question.selectAllItem -->
            <input type="checkbox" data-bind="attr: {name: question.name, id: question.inputId + '_' + $index(), 'aria-label': item.locText.renderedHtml }, checked: question.koAllSelected, enable: !question.isReadOnly, css: question.koCss().itemControl"/> 
          <!-- /ko -->
          <!-- ko if: item != question.selectAllItem -->
            <input type="checkbox" data-bind="attr: {name: question.name, value: item.value, id: question.inputId + '_' + $index(), 'aria-label': item.locText.renderedHtml }, checked: question.koValue, enable: !question.isReadOnly && item.isEnabled, css: question.koCss().itemControl"/>
          <!-- /ko -->
          <span data-bind="css: question.koCss().materialDecorator">
            <span class="check"></span>
          </span>
          <!-- ko if: question.activeEditItem() == $index()--> 
            <span class="survey-item-input" data-bind="css: question.koCss().controlLabel">
              <input data-bind=" event: { blur: question.editItemText.bind($parent)}, value: item.value, valueUpdate: 'afterkeydown' " autofocus /> 
            </span>  
          <!-- /ko -->
          <!-- ko if: question.activeEditItem() != $index()--> 
            <span data-bind="css: question.koCss().controlLabel, click: question.editItem.bind($parent, $index)"> 
              <!-- ko template: { name: 'survey-string', data: item.locText } -->
              <!-- /ko -->
            </span>
          <!-- /ko -->
        </label>  
        <!-- ko if: question.activeItem() == $index()--> 
          <div class="items-control">
              <span class="item-c" data-bind="click: question.editItem.bind($parent, $index)"> Edit </span>
               <!--<span class="item-c"> change location </span>-->
              <span class="item-c" data-bind="click: question.deleteItem.bind($parent, $index)">delete</span>
          </div>
        <!-- /ko -->
        <!-- ko if: question.hasOther && ($index() == question.visibleChoices.length-1) -->
            <div class="form-group" data-bind="template: { name: 'survey-comment', data: {'question': question, 'visible': question.isOtherSelected } }">
            </div>  
        <!-- /ko --> 
      </div>
  <!-- /ko --> 
     <!-- /ko -->      
       <!-- ko if: question.active() == true --> 
    <span data-bind="click: question.addNewItem.bind($data)">Add item</span>
    <!-- /ko -->  
    </fieldset></script>

<script type="text/html" id="survey-question-radiogroup">
  <fieldset data-bind="css: question.koCss().root">
      <legend data-bind="attr: { 'aria-label': question.locTitle.renderedHtml }">
      </legend>
      <!-- ko ifnot: question.hasColumns  -->
      <!-- ko foreach: { data: question.visibleChoices,sortableList:question.visibleChoices, as: 'item', afterRender: question.koAfterRender}  -->  
          <div class="item-container" data-bind="event: {  mouseover: question.itemHover.bind($parent , $index, 'a'), mouseout: question.itemHover.bind($parent , $index , 'e') ,css: question.getItemClass(item)}"> 
            <label data-bind="css: question.koCss().label">  
              <input type="radio" data-bind="attr: {name: question.name + '_' + question.id, value: item.value, id: question.inputId + '_' + $index(), 'aria-label': item.locText.renderedHtml}, checked: question.value, enable: !question.isReadOnly && item.isEnabled, css: question.koCss().itemControl"/> 
              <span data-bind="css: question.koCss().materialDecorator"></span>
              <span class="check"></span>
              <!-- <span class="survey-item-input" data-bind="css: question.koCss().controlLabel">  -->
                <!-- ko if: question.activeEditItem() == $index()-->
                  <span class="survey-item-input" data-bind="css: question.koCss().controlLabel"> 
                    <input data-bind=" event: { blur: question.editItemText.bind($parent)}, value: item.value, valueUpdate: 'afterkeydown' " autofocus />
                  </span> 
                <!-- /ko --> 
                <!-- ko if: question.activeEditItem() != $index()--> 
                  <span data-bind="click: question.editItem.bind($parent, $index)">
                    <!-- ko template: { name: 'survey-string', data: item.locText } --> 
                    <!-- /ko -->
                  </span>
                <!-- /ko -->
              <!-- </span> -->
            </label>
            <!-- ko if: question.activeItem() == $index()--> 
              <div class="items-control">
                <span class="item-c" data-bind="click: question.editItem.bind($parent, $index)"> Edit </span>
                <!--<span class="item-c"> change location </span>-->
                <span class="item-c" data-bind="click: question.deleteItem.bind($parent, $index)">delete</span> 
              </div> 
            <!-- /ko -->
            <!-- ko if: question.hasOther && ($index() == question.visibleChoices.length-1) -->
                <div class="form-group" data-bind="template: { name: 'survey-comment', data: {'question': question, 'visible': question.isOtherSelected}}"></div>
            <!-- /ko -->
          </div> 
          <!-- /ko -->
        <!-- /ko -->  
     <!-- ko if: question.hasColumns  -->        
    <!-- ko foreach: question.columns -->        
    <div data-bind="css: question.getColumnClass()">            
        <!-- ko foreach: { data: $data, as: 'item', afterRender: question.koAfterRender }  -->                
        <!-- ko template: 'survey-radiogroup-item' -->                <!-- /ko -->            
        <!-- /ko -->            </div>        <!-- /ko -->      <!-- /ko -->      
        <!-- ko if: question.canShowClearButton -->      
      <div>          
        <input type="button" data-bind="click:question.clearValue, css: question.koCss().clearButton, value: question.clearButtonCaption"/>      
      </div>      <!-- /ko -->
        <!-- ko if: question.active() == true -->  
          <span data-bind="click: question.addNewItem.bind($data)">Add item</span>  
        <!-- /ko -->  
  </fieldset>
</script>

<script type="text/html" id="survey-question-dropdown">
  <!-- ko ifnot: question.isReadOnly -->
<div data-bind="css: question.koCss().selectWrapper">
  <select
    data-bind="attr: {id: question.inputId, 'aria-label': question.locTitle.renderedHtml}, value: question.renderedValue, valueAllowUnset: true, css: question.koCss().control">
    <!-- ko if: question.showOptionsCaption -->
    <option data-bind="text:question.optionsCaption, value: null"></option>
    <!-- /ko -->
    <!-- ko foreach: question.visibleChoices -->
    <option data-bind="value: $data.value, text: $data.text, attr: { disabled: !$data.isEnabled }"></option>
    <!-- /ko -->
  </select>
</div>
<!-- /ko -->
<!-- ko if: question.isReadOnly -->
<div class="drop-down-content">
  <div
    data-bind="text: question.hasOther && question.isOtherSelected ? question.otherText : question.displayValue, css: question.koCss().control">
  </div>
  <!-- ko if: question.active() == true -->
  <div class="edit-choices" data-bind="click: question.activeEditChoices.bind($data)"> Edit Choices</div>
  <!-- /ko -->
  <!-- ko if: question.activeChoice() == true -->
  <!-- ko foreach: question.visibleChoices -->

  <div class="item-container"
    data-bind="event: { mouseover: question.itemHover.bind($parent , $index, 'a'), mouseout: question.itemHover.bind($parent , $index , 'e')}">
    <!-- ko if: question.activeEditItem() == $index()-->
    <span class="survey-item-input" data-bind="css: question.koCss().controlLabel">
      <input
        data-bind=" event: { blur: question.editItemText.bind($parent)}, value: $data.value, valueUpdate: 'afterkeydown' "
        autofocus />
    </span>
    <!-- /ko -->
    <!-- ko if: question.activeEditItem() != $index()-->
    <div data-bind="value: $data.value, text: $data.text"></div>
    <!-- /ko -->

    <!-- ko if: question.activeItem() == $index()-->
    <div class="items-control">
      <span class="item-c" data-bind="click: question.editItem.bind($parent, $index)"> Edit </span>
      <!--<span class="item-c"> change location </span>-->
      <span class="item-c" data-bind="click: question.deleteItem.bind($parent, $index)">delete</span>
    </div>
    <!-- /ko -->
  </div>

  <!-- /ko -->
  <span data-bind="click: question.addNewItem.bind($data)">Add item</span>
  <!-- /ko -->
</div>
<!-- /ko -->
<!-- ko if: question.hasOther -->
<div class="form-group"
  data-bind="template: { name: 'survey-comment', data: {'question': question, 'visible': question.isOtherSelected } }, style: {display: question.isFlowLayout ? 'inline': ''}">
</div>
<!-- /ko -->
</script>
<script type="text/html" id="survey-question-rating">
  <div data-bind="css: question.koCss().root"> 
    <!-- ko foreach: question.koVisibleRateValues -->
      <label class="item-container" data-bind="event: { mouseover: question.itemHover.bind($parent , $index, 'a'), mouseout: question.itemHover.bind($parent , $index , 'e') },css: question.koGetCss($data)">
        <input type="radio" style="display: none;" data-bind="attr: {name: question.name, id: question.name + $index(), value: $data.value, 'aria-label': $data.locText.text}, event: { change: question.koChange}, enable: !question.isReadOnly"/>
        <!-- ko if: $index() == 0 -->
          <span data-bind="css: question.koCss().minText">
            <!-- ko template: { name: 'survey-string', data: question.locMinRateDescription } -->
            <!-- /ko -->
          </span>
        <!-- /ko -->
        <!-- ko if: question.activeEditItem() == $index()-->
          <span  class="survey-item-input" data-bind="css: question.koCss().controlLabel">
            <input data-bind=" event: { blur: question.editItemText.bind($parent)}, value: $data.value, valueUpdate: 'afterkeydown' " autofocus />
          </span> 
        <!-- /ko -->
        <!-- ko if: question.activeEditItem() != $index()-->
          <span data-bind="css: question.koCss().itemText,  click: question.editItem.bind($parent, $index)">
            <!-- ko template: { name: 'survey-string', data: $data.locText } -->
            <!-- /ko -->
          </span>
        <!-- /ko-->
        <!-- ko if: question.activeItem() == $index()-->
          <span class="items-control">
            <span  class="item-c"  data-bind="click: question.editItem.bind($parent, $index)"> Edit </span>
            <span  class="item-c"  data-bind="click: question.deleteItem.bind($parent, $index)">delete</span>
          </span>
        <!-- /ko -->
        <!-- ko if: $index() == (question.koVisibleRateValues().length-1) -->
          <span data-bind="css: question.koCss().maxText">
            <!-- ko template: { name: 'survey-string', data: question.locMaxRateDescription } -->
            <!-- /ko -->
          </span> 
        <!-- /ko -->
      </label>
    <!-- /ko -->
  </div> 
  <div data-bind="visible: question.hasOther">
    <div data-bind="template: { name: 'survey-comment', data: {'question': question } }"></div>
  </div>
  <!-- ko if: question.active() == true --> 
    <span data-bind="click: question.addNewItem.bind($data)">Add item</span>
  <!-- /ko --> 
</script>



<script type="text/html" id="survey-question-boolean">
  <div  data-bind="css: question.koCss().root">
    <label class="item-container full-width"  data-bind=" css: question.getItemCss() , event:{ mouseover: question.titleHover.bind($parent , $data,'a' ), mouseout: question.titleHover.bind($parent , $data ,'e' )}">     
      <input type="checkbox" data-bind="attr: {name: question.name, id: question.inputId, 'aria-label': question.locTitle.renderedHtml}, checked: question.checkedValue, surveyProp: {indeterminate: question.isIndeterminate}, enable: !question.isReadOnly"/> 
      
      <span data-bind="css: question.koCss().materialDecorator">
          <span class="check"></span>
        </span>
        
         <!-- ko if: question.activeEditTitle() != $data.visibleIndex-->
        <span data-bind="css: question.koCss().label">
              <!-- ko template: { name: 'survey-string', data: locDisplayLabel } -->
              <!-- /ko -->
        </span>
        <!--/ko-->

        <!-- ko if: question.activeEditTitle() == $data.visibleIndex-->
          <input class="survey-question-title-input boolean-input" data-bind=" event: { blur: question.editItemTitle.bind($parent)}, value: $data.title, valueUpdate: 'afterkeydown' " autofocus /> 
        <!--/ko-->
        <!-- ko if: question.activeTitle() == $data.visibleIndex-->
          <span class="survey-question-title-edit" data-bind="click: question.editTitle.bind($data, $data)"> Edit </span> 
        <!--/ko-->
    </label>
  </div>
</script>




<script type="text/html" id="survey-question-multipletext">
  <table data-bind="css: question.koCss().root, foreach: { data:  question.koRows, as: 'row' }">
    <tr data-bind="foreach: { data: row, as: 'item' }, css: question.koCss().row">

      <td data-bind="css: question.koCss().itemTitle, event: { mouseover: question.itemHover.bind($parents[1] , item.id, 'a'), mouseout: question.itemHover.bind($parents[1] , item.id , 'e')}">
         <!-- ko if: question.activeEditItem() == item.id--> 
         <span class="survey-item-input" data-bind="css: question.koCss().controlLabel">
            <input data-bind=" event: { blur: question.editItemText.bind($parents[1])}, value: item.title, valueUpdate: 'afterkeydown' " autofocus /> 
          </span>  
        <!-- /ko -->
        <!-- ko if: question.activeEditItem() != item.id-->
           <span> 
            <!-- ko template: { name: 'survey-string', data: item.locTitle } -->
            <!-- /ko -->
           </span>
        <!-- /ko -->
          <!-- ko if: question.activeItem() == item.id--> 
          <div class="items-control">
              <span class="item-c" data-bind="click: question.editItem.bind($parents[1], item.id)"> Edit </span>
          </div>
        <!-- /ko -->
      </td>
      <td>
        <!-- ko template: { name: 'survey-question-errors', data: item.editor } -->
        <!-- /ko -->
        <!-- ko template: { name: item.editor.koTemplateName(), data: item.editor, as: 'question' } -->
        <!-- /ko -->
      </td>
    </tr>
  </table>
</script>