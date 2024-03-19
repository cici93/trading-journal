using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Migrations
{
    /// <inheritdoc />
    public partial class modelchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Positions_PositionId",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Return",
                table: "Positions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Positions_PositionId",
                table: "Transactions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "PositionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Positions_PositionId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Return",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Transactions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Positions_PositionId",
                table: "Transactions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "PositionId");
        }
    }
}
