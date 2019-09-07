import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { statisticCourseController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class StatisticClassRouter extends CrudRouter<typeof statisticCourseController> {
    constructor() {
        super(statisticCourseController);
    }
    customRouter() {
        this.router.get("/statisticForLineChart/", this.statisticForLineChartMiddlewares(), this.route(this.statisticForLineChart))
        this.router.get("/statisticForPieChart/", this.statisticForPieChartMiddlewares(), this.route(this.statisticForPieChart))
    }

    statisticForLineChartMiddlewares(): any[] {
        return []
    }

    statisticForPieChartMiddlewares(): any[] {
        return []
    }

    // Lấy dữ liệu cho khóa học biểu đồ đường
    async statisticForLineChart(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                course: { type: "string" },
                type: { type: "string", enum: ["week", "month", "year", "realTime"] },
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.statisticForLineChart(req.query)
        this.onSuccess(res, result)
    }

    // Lấy dữ liệu cho khóa học dạng biểu đồ tròn
    async statisticForPieChart(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                course: { type: "string" },
                type: { type: "string", enum: ["week", "month", "year", "realTime"] },
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.statisticForPieChart(req.query)
        this.onSuccess(res, result)
    }

    getListMiddlewares(): any[] {
        return [
            //authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    getItemMiddlewares(): any[] {
        return [
            // authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    createMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"])
        ]
    }

    updateMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    deleteMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    deleteAllMiddlewares(): any[] {
        return [
            blockMiddleware.run()
        ]
    }

}

