import * as express from 'express';
import { CrudRouter } from '../crud';
import { Request, Response } from '../base'
import { statisticStudentController } from '../../controllers'
import { authInfoMiddleware, queryInfoMiddleware, blockMiddleware } from '../../middlewares'

export default class StatisticStudentRouter extends CrudRouter<typeof statisticStudentController> {
    constructor() {
        super(statisticStudentController);
    }

    customRouter() {
        this.router.get("/statisticForListDetail/", this.statisticForListDetailMiddlewares(), this.route(this.statisticForListDetail))
        this.router.get("/statisticForCalendarChart/", this.statisticForCalendarChartMiddlewares(), this.route(this.statisticForCalendarChart))
        // this.router.get("/statisticForSingleDetail/", this.statisticForSingleDetailMiddlewares(), this.route(this.statisticForCalendarChart))
        this.router.get("/statisticForPieChart/", this.statisticForPieChartMiddlewares(), this.route(this.statisticForPieChart))
    }

    statisticForListDetailMiddlewares(): any[] {
        return []
    }

    statisticForCalendarChartMiddlewares(): any[] {
        return []
    }

    statisticForPieChartMiddlewares(): any[] {
        return []
    }

    // Lấy dữ liệu cho khóa học dạng danh sách chi tiết
    async statisticForListDetail(req: Request, res: Response) {
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
        const result = await this.controller.statisticForListDetail(req.query)
        this.onSuccess(res, result)
    }

    // Lấy dữ liệu cho học sinh dạng biểu đồ ngày tháng
    async statisticForCalendarChart(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                student: { type: "string" },
                course: { type: "string" },
                type: { type: "string", enum: ["week", "month", "year", "realTime"] },
                startTime: { type: "string", format: "date-time" },
                endTime: { type: "string", format: "date-time" }
            },
            additionalProperties: false
        })
        const result = await this.controller.statisticForCalendarChart(req.query)
        this.onSuccess(res, result)
    }

    // Lấy dữ liệu cho khóa học dạng biểu đồ tròn
    async statisticForPieChart(req: Request, res: Response) {
        await this.validateJSON(req.query, {
            type: "object",
            properties: {
                student: { type: "string" },
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
            // authInfoMiddleware.run(["admin"]),
            queryInfoMiddleware.run()
        ]
    }

    getItemMiddlewares(): any[] {
        return [
            authInfoMiddleware.run(["admin"]),
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

