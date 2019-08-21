import * as CachemanMongo from 'cacheman-mongo';
import { config } from '../../config';
import * as uuidv1 from 'uuid/v1';
export class CacheService {
    cacheEngine: any = new CachemanMongo(config.database.mongo, {
        collection: 'Cache'
    })
    async cache(data: any, option?: { ttl: number }) {
        return await this.set(uuidv1(), data, option);
    }
    set(key: string, data: any, option: { ttl: number } = { ttl: 60 }): Promise<string> {
        return new Promise((resolve, reject) => {
            this.cacheEngine.set(key, data, option.ttl, (err: any, value: any) => {
                if (err) reject(err);
                else resolve(key);
            });
        })
    }
    get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cacheEngine.get(key, (err: any, value: any) => {
                if (err) reject(err);
                else resolve(value);
            })
        })
    }
    remove(key: string) {
        return new Promise((resolve, reject) => {
            this.cacheEngine.del(key, (err: any) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }
    clear() {
        return new Promise((resolve, reject) => {
            this.cacheEngine.clear((err: any) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }
}