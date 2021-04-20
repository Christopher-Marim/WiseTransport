import React from 'react'
import {useState, useEffect} from 'react';
import getRealm from '../services/realm';

  function useRealm() {

    useEffect(()=>{
      getRealm().then((realm)=>{
          setRealm(realm)
      })

    })

   const [realm, setRealm]= useState()

 async function createInStore(schema, object) {
    realm.write(() => {
      realm.create(schema, object);
    });
    return;
  }

async  function deleteInStore(object) {
    realm.write(() => {
      realm.delete(object);
    });
    return;
  }

async  function updateInStore(schema, object) {
    realm.write(() => {
      realm.create(schema, object, 'modified');
    });
    return;
  }

 async function getAllStore(schema) {
    return realm.objects(schema);
  }

 async function findFilteredInStore(schema, filter) {
    const objects = realm.objects(schema);
    return objects.filtered(filter);
  }

  return {
    createInStore,
    deleteInStore,
    updateInStore,
    getAllStore,
    findFilteredInStore,
    
  };
};

export default useRealm;
