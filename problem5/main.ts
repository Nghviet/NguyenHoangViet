import express, {Request, Response} from 'express';

import resourceAPI from './src/api/resource';
import { QueryComparisionType } from './src/enum/enum';
import { GlobalVariable } from './src/global';
import cors from 'cors';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

GlobalVariable.getDatabase();

app.use(express.json());
app.use(cors())
app.use('/api/resource', resourceAPI);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

