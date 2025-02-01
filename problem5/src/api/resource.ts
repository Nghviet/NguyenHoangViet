import {Router, Request, Response} from 'express';
import { IFeatureQuery } from '../database/database';
import { GlobalVariable } from '../global';
import { UserReviewDataModel } from '../model/UserReviewDataModel';
import { QueryComparisionType, QueryValueType } from '../enum/enum';

const router = Router();

function validate_request(req: Request) : boolean {
    return true;
}

router.get('/', (req: Request, res: Response) => {
    if(!validate_request(req)) res.status(400).send();

    var database = GlobalVariable.getDatabase();
    var queries: IFeatureQuery[] = req.body.queries.map((
        e: { variable_name: string; query_value: string; query_value_type: string; comparision_type: string; }) => 
            database.creating_feature_query(e.variable_name, e.query_value, e.query_value_type, e.comparision_type));

    res.status(201).send({
        "results" : database.query_and_cast<UserReviewDataModel>(queries)
    });
}) 

router.get('/:document_id', (req: Request<{ document_id: string}>,res: Response) => {
    if(!validate_request(req)) res.status(400).send();
    
    var database = GlobalVariable.getDatabase();
    var queries = [database.creating_feature_query('$document_id', req.params.document_id, QueryValueType.STRING, QueryComparisionType.SIMILAR)];

    var data = database.query_and_cast<UserReviewDataModel>(queries);
    if(data.length != 1) res.status(404).send("No matching document");
    else res.status(201).send(data[0]);
})

router.post('/', (req: Request, res: Response) => {
    if(!validate_request(req)) res.status(400).send();

    var database = GlobalVariable.getDatabase();
    var data = req.body.data;
    var doc = new UserReviewDataModel(data.user_name, data.email, data.rating, data.detail_review);

    res.status(201).send({
        "results": database.add([doc])
    });
})

router.put('/:document_id', (req: Request<{document_id: string}>, res: Response) => {
    if(!validate_request(req)) res.status(400).send();

    var database = GlobalVariable.getDatabase();
    var queries = [database.creating_feature_query('$document_id', req.params.document_id, QueryValueType.STRING, QueryComparisionType.SIMILAR)];
    var data = database.query_and_cast<UserReviewDataModel>(queries);
    if(data.length != 1) res.status(404).send("No matching document");
    else {
        var document = data[0] as UserReviewDataModel;
        var newData = req.body.data;

        if(newData.user_name) document.setUserName(newData.user_name);
        if(newData.email) document.setEmail(newData.email);
        if(newData.rating) document.setRating(Number(newData.rating));
        if(newData.detail_review) document.setDetailReview(newData.detail_review);
        res.status(201).send({
            "result": database.update(queries, document)
        });
        
    }
});

router.delete('/:document_id', (req: Request<{document_id: string}>, res: Response) => {
    if(!validate_request(req)) res.status(400).send();

    var database = GlobalVariable.getDatabase();
    var queries = [database.creating_feature_query('$document_id', req.params.document_id, QueryValueType.STRING, QueryComparisionType.SIMILAR)];
    res.status(201).send({
        "result": database.delete(queries)
    });
})

export default router;