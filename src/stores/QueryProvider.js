import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const QueryProvider = ({children}) => {
    const store = useLocalStore(() => ({
      queries: [
        {id:0, pId:0, oId:0}
      ],
      isChangedState: false,
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
        {label:'between', value: 'BETWEEN value1 AND value2'}, 
        {label:'greater than', value: '>'}, 
        {label:'less than', value: '<'},
        {label:'in list', value: 'ColumnName IN (values)'}
      ],
    /**
     * Adds query row
    */
    addQuery: (query = {id:store.queriesCount, pId:0, oId:0}) => {      
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
      return store.queries[rowId].oId;
    },
    getPlaceholder: (rowId) => {
      const pId = store.queries[rowId] ? store.queries[rowId].pId : 0;
      return store.predicateOptions[pId].placeholder;
    },
    /**
     * Concatentates values based on selected ids
    */
    search: () => {
      store.isChangedState = true;
      let sqlQuery = 'SELECT * FROM tableName WHERE ';
      for(let i = 0; i < store.queriesCount; i++){
        const pId = store.queries[i].pId !== undefined ? store.queries[i].pId : 0;
        const oId = store.queries[i].oId !== undefined ? store.queries[i].oId : 0;

        sqlQuery += store.predicateOptions[pId].value + ' ';
        sqlQuery += store.stringOptions[oId].value + ' ';

        if(store.queriesCount > 1 && i < store.queriesCount){
          sqlQuery += 'AND ';
        }
      }
      store.output = sqlQuery;
      store.showOutput = true;
    },
    /**
     * Resets form to default settings
    */
      reset: () => {
      store.queries = [{id:0, pId:0, oId:0}];
      store.output = '';
      store.showOutput = false;
      store.isDefault = true;
      store.isChangedState = false;
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