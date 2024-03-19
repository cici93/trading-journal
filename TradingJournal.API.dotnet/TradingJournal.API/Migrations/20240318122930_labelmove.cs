using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Migrations
{
    /// <inheritdoc />
    public partial class labelmove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "Transactions");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Positions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "Positions");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Transactions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
