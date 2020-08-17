import React, { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";

export const QueryProvider = ({children}) => {
    const store = useLocalStore(() => ({
      queries: [
        {id:0}
      ],
      showOutput: false,
      output: '',
      predicateOptions: [
        {label:"User Email", value:"user_email", type:"string"},
        {label:"Screen Width", value:"screen_width", type:"integer"},
        {label:"Screen Height", value:"screen_height", type:"integer"},
        {label:"# of Visits", value:"visits", type:"integer"},
        {label:"First", value:"first_name", type:"string"},
        {label:"Name", value:"Name", type:"string"},
        {label:"Last Name", value:"last_name", type:"string"},
        {label:"Page Response time (ms)", value:"page_response", type:"integer"},
        {label:"Domain", value:"domain", type:"string"},
        {label:"Page Path", value:"path", type:"string"},
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

      addQuery: query => {
        query.id = store.queriesCount;
        store.queries.push(query);
      },
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
      reset: () => {
        const id = store.queriesCount;
        store.queries = [{id: 0}];
        store.output = '';
      },
      get queriesCount(){
        return store.queries.length;
      }
    }));
  
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
  }
  export const StoreContext = createContext();