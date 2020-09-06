import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

const defaultQuery = {id:0, pId:0, oId:0, textValue:'', num1:0, num2:0};

export const QueryProvider = ({children}) => {
    const store = useLocalStore(() => ({
      queries: [
        defaultQuery
      ],
      isChangedState: false,
      wasSearchCalled: false,
      showOutput: false,
      output: '',
      predicateOptions: [
        {label:"User Email", value:"user_email", placeholder:"johndoe@email.com", type:"string"},
        {label:"Screen Width", value:"screen_width", placeholder: "width", type:"number"},
        {label:"Screen Height", value:"screen_height", placeholder: "height", type:"number"},
        {label:"# of Visits", value:"visits", placeholder: "0", type:"number"},
        {label:"First Name", value:"first_name", placeholder: "first name", type:"string"},
        {label:"Last Name", value:"last_name", placeholder:"last name", type:"string"},
        {label:"Page Response time (ms)", value:"page_response", placeholder: "100", type:"number"},
        {label:"Domain", value:"domain", placeholder:"website.com", type:"string"},
        {label:"Page Path", value:"path", placeholder:"page path", type:"string"}
      ],
      stringOptions: [
        {label:'equals', value:'='}, 
        {label:'contains', value: "CONTAINS(ColumnName, 'test')"}, 
        {label:'starts with', value: 'LIKE a%'}, 
        {label:'in list', value: 'ColumnName IN (values)'}
      ],
      integerOptions: [
        {label:'equals', value:'='},  
        {label:'between', value: 'BETWEEN'}, 
        {label:'greater than', value: '>'}, 
        {label:'less than', value: '<'},
        {label:'in list', value: 'ColumnName IN (values)'}
      ],
    /**
     * Adds query row
    */
    addQuery: (query = {id:store.queriesCount, pId:0, oId:0, textValue:'', num1:0, num2:0}) => {      
      store.isChangedState = true;
      store.queries.push(query);
    },
    /**
     * Removes query row
    */
    removeQuery: id => {
      if(store.queries.length === 1 && id === 0 ){
        store.reset();
      }else{
        // Remove specific row
        store.queries.splice(id,1);
        // Reassign ids in order 
        for (let i = 0; i < store.queriesCount; i++){
          store.queries[i].id = i; 
        }
      }
    },
    setPredicateId: (rowId, pId) => {
      store.queries[rowId].pId = pId;
      if(store.getPredicateType(rowId) === 'string'){
        store.queries[rowId].num1 = store.queries[rowId].num2 = 0;
      }else{
        store.queries[rowId].textValue = '';
      }

    },
    getPredicateId: (rowId) => {
      const pId = store.queries[rowId] ? store.queries[rowId].pId : 0;
      return pId;
    },
    getPredicateType: (rowId) => {
      const pId = store.queries[rowId] ? store.queries[rowId].pId : 0;
      return store.predicateOptions[pId].type;
    },
    setOperatorId: (rowId, oId) => {
      store.queries[rowId].oId = oId;
    },
    getOperatorId: (rowId) => {
      const oId = store.queries[rowId] ? store.queries[rowId].oId : 0;
      return oId;
    },
    setTextValue: (rowId, str) => {
      store.queries[rowId].textValue = str;
    },
    getTextValue: (rowId) => {
      return (store.queries[rowId]) ? store.queries[rowId].textValue : '';
    },
    getPlaceholder: (rowId) => {
      const pId = store.queries[rowId] ? store.queries[rowId].pId : 0;
      return store.predicateOptions[pId].placeholder;
    },
    setNum1Value: (rowId, val) => {
      store.queries[rowId].num1 = val;
    },
    setNum2Value: (rowId, val) => {
      store.queries[rowId].num2 = val;
    },
    getNum1Value: (rowId) => {
      return store.queries[rowId].num1;
    },
    getNum2Value: (rowId) => {
      return store.queries[rowId].num2;
    },
    /**
     * Concatentates values based on selected ids
    */
    search: () => {
      store.isChangedState = store.wasSearchCalled = true;
      let hasInvalidFields = false;
      for(let i = 0; i < store.queriesCount; i++){
        if(store.queries[i].textValue === '' || (store.queries[i].type === 'number' && store.queries[i].num2 === 0)){
          console.log(store.queries[i].textValue === '', "||", store.queries[i].num2 === 0);
          console.log(store.queries[i].textValue, "||", store.queries[i].num2);
          hasInvalidFields = true;
        }     
       }
  
      // All fields are valid, perform search
      if(hasInvalidFields){
        store.output = 'Please complete the highlighted fields';
        store.showOutput = true;
      }else{
        let sqlQuery = 'SELECT * FROM tableName WHERE ';
        for(let i = 0; i < store.queriesCount; i++){
          const pId = store.queries[i].pId !== undefined ? store.queries[i].pId : 0;
          const oId = store.queries[i].oId !== undefined ? store.queries[i].oId : 0;
  
          sqlQuery += store.predicateOptions[pId].value + ' ';
          
          if(store.getPredicateType(i) === 'number'){
            sqlQuery += store.integerOptions[oId].value + ' ';
          }else{
            sqlQuery += store.stringOptions[oId].value + ' ';
          }
          if(store.getOperatorId(i) === 1){
            sqlQuery += `${store.getNum1Value(i)} AND ${store.getNum2Value(i)} `;
          }else{
            if(store.getPredicateType(i) === 'number'){
              sqlQuery += `${store.getTextValue(i)} `;
            }else{
              sqlQuery += `"${store.getTextValue(i)}" `;
            }
          }
          
          // Append AND if additional queries follow this 
          if(store.queriesCount > 1 && i < store.queriesCount-1){
            sqlQuery += 'AND ';
          }
        }
        store.output = sqlQuery;
        store.showOutput = true;
      }
    },
    /**
     * Resets form to default settings
    */
    reset: () => {
      store.queries = [defaultQuery];
      store.output = '';
      store.showOutput = store.isChangedState = store.wasSearchCalled = false;
    },
    /**
     * Gets length of query rows
    */
    get queriesCount(){
      return store.queries.length;
    }
  }));
  
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
  }
  export const StoreContext = createContext();