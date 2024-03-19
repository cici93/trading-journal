using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TradingJournal.Migrations
{
    /// <inheritdoc />
    public partial class roi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Return",
                table: "Positions",
                newName: "Roi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Roi",
                table: "Positions",
                newName: "Return");
        }
    }
}
