import Realm from 'realm'
import JourneySchema from '../schemas/JourneySchema';
import VeiculesSchema from '../schemas/VeiculesSchema';
import OccurrenceSchema from '../schemas/OccurrenceSchema';
import OccurrenceListSchema from '../schemas/OccurrenceListSchema';

export default function getRealm(){
    return (
        Realm.open({
        schema:[ JourneySchema, VeiculesSchema, OccurrenceSchema, OccurrenceListSchema ],
        schemaVersion: 1,
    })
    )
}