import Realm from 'realm'
import JourneySchema from '../schemas/JourneySchema';
import UserSchema from '../schemas/UserSchema';
import VeiculesSchema from '../schemas/VeiculesSchema';
import OccurrenceSchema from '../schemas/OccurrenceSchema';
import OccurrenceListSchema from '../schemas/OccurrenceListSchema';

export default function getRealm(){
    return (
        Realm.open({
        schema:[ UserSchema,JourneySchema, VeiculesSchema, OccurrenceSchema, OccurrenceListSchema ],
        schemaVersion: 7,
    })
    )
}