"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const questions_service_1 = require("./questions.service");
describe('QuestionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [questions_service_1.QuestionsService],
        }).compile();
        service = module.get(questions_service_1.QuestionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=questions.service.spec.js.map