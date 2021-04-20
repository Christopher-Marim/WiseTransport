import Realm from 'realm'
import InventorysSchema from '../schemas/InventorysSchema';
import ItensInventorySchema from '../schemas/ItensInventorySchema';
import StorageProducts from '../schemas/StorageProducts';
import UserSchema from '../schemas/UserSchema';

export default function getRealm(){
    return (
        Realm.open({
        schema:[ UserSchema,InventorysSchema,ItensInventorySchema, StorageProducts],
        schemaVersion: 7,
    })
    )
}