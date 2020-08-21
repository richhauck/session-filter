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
        {label:"User Email", value:"user_email", placeholder:"email", type:"string"},
        {label:"Screen Width", value:"screen_width", type:"integer"},
        {label:"Screen Height", value:"screen_height", type:"integer"},
        {label:"# of Visits", value:"visits", type:"integer"},
        {label:"First", value:"first_name", placeholder: "first", type:"string"},
        {label:"Name", value:"Name", placeholder:"name", type:"string"},
        {label:"Last Name", value:"last_name", placeholder:"last name", type:"string"},
        {label:"Page Response time (ms)", value:"page_response", type:"integer"},
        {label:"Domain", value:"domain", placeholder:"website.com", type:"string"},
        {label:"Page Path", value:"path", placeholder:"page path", type:"string"}
    ],
    stringOptions: [
        {label:'equals', value:'equals'}, 
        {label:'contains', value: 'contains'}, 
        {label:'starts with', value: 'starts with'}, 
        {label:'in list', value: 'in list'}
    ],
    integerOptions: [
      {label:'equals', value:'equals'}, 
      {label:'between', value: 'between'}, 
      {label:'greater than', value: '>'}, 
      {label:'less than', value: '<'},
      {label:'in list', value: 'in list'},
    ],
    /**
     * Adds query row
    */
    addQuery: query => {
      query.id = store.queriesCount;
      store.isChangedState = true;
      store.queries.push(query);
    },
    /**
     * Removes query row
    */
    removeQuery: id => {
      if(id !== 0){
        // Remove specific row
        store.queries.splice(id,1);
        // Reassign ids in order 
        for (let i = 0; i < store.queriesCount; i++){
          store.queries[i].id = i; 
        }
      }else{
        store.reset();
      }
    },
    setPredicateId: (rowId, pId) => {
      store.queries[rowId].pId = pId;
    },
    setOperatorId: (rowId, oId) => {
      store.queries[rowId].oId = oId;
    },
    /**
     * Concatentates values based on selected ids
    */
    search: () => {
      let sqlQuery = '';
      for(let i = 0; i < store.queriesCount; i++){
        const pId = store.queries[i].pId !== undefined ? store.queries[i].pId : 0;
        const oId = store.queries[i].oId !== undefined ? store.queries[i].oId : 0;

        console.log(store.predicateOptions[pId])
        console.log(store.stringOptions[oId])
        /*
        for (const [key, value] of Object.entries(store.queries[i])) {
          console.log(`${key}: ${value}`);
        }
        */
      }
      store.output = 'this is a test'
      store.showOutput = true;
    },
    /**
     * Resets form to default settings
    */
      reset: () => {
      store.queries = [{id: 0}];
      store.output = '';
      store.showOutput = false;
      store.isDefault = true;
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