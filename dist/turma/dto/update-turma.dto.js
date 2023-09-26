"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTurmaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_turma_dto_1 = require("./create-turma.dto");
class UpdateTurmaDto extends (0, mapped_types_1.PartialType)(create_turma_dto_1.CreateTurmaDto) {
}
exports.UpdateTurmaDto = UpdateTurmaDto;
//# sourceMappingURL=update-turma.dto.js.map