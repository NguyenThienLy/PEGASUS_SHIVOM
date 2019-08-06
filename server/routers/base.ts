import * as express from 'express';
import * as _ from 'lodash';
import { utilService } from '../services/index';
import { ICrudExecOption, ICrudOption, errorService } from '../services'
import { config } from '../config'
import {  } from '../models'

export interface Request extends express.Request {
    queryInfo?:ICrudOption
 
    [x: string]: any
    firebaseUserInfo: any
}
export interface Response extends express.Response {
    [x: string]: any
}
export interface IValidateSchema {
    type?: string | string[]
    properties?: IValidateSchemaProperties
    additionalProperties?: boolean
    required?: string[]
    uniqueItems?: boolean
    minItems?: number
    items?: IValidateSchema
    [x: string]: any
}
export interface IValidateSchemaProperties {
    [x: string]: IValidateSchema
}
export class BaseRouter {

    onError(res: Response, error: any) {
        const options = error.options || error.errorInfo;
        if (!options) {
          console.log("UNKNOW ERROR", error)
         
          const err = errorService.router.somethingWentWrong()
          res.status(err.options.code).json(err.options)
        } else {
          res.status(_.get(options.code) || 500).json(options)
        }
      }
    onSuccess(res: Response, object: any = {}, extras: any = {}) {
        object = object || {}
        if (Object.keys(object).length === 0) {
            res.status(200).json({ code: 200 });
        }
        else {
            res.status(200).json({
                code: 200,
                result: Object.assign({
                    object
                }, extras)
            });
        }
    }
    onSuccessAsList(res: Response, objects: any = [], extras: any = {}, option: ICrudOption = {
        offset: 0, limit: config.database.defaultPageSize
    }) {
        if (objects.toJSON) {
            objects = objects.toJSON()
        }
        const page = _.floor(option.offset / option.limit) + 1
        res.json({
            code: 200,
            results: Object.assign({
                objects
            }, extras),
            pagination: {
                'current_page': page,
                'next_page': page + 1,
                'prev_page': page - 1,
                'limit': option.limit
            }
        })
    }
    async validateJSON(body: any, schema: IValidateSchema) {
        const validate = await utilService.validateJSON(schema, body)
        if (!validate.isValid) {
            console.log("Body isValid");
        }
    }
    route(func: (req: Request, rep: Response) => Promise<any>) {
        return (req: Request, res: Response) => func
          .bind(this)(req, res)
          .catch((error: any) => {
            this.onError(res, error)
          })
    }
}