import fs = require("fs");
import { typeOrmConfig } from '../config/typeorm.config';

fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig, null, 2));