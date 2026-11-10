using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eispraxis.Api.Migrations;

public partial class SavePaidFees : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Stop for review if existing records would violate the new unique index.
        migrationBuilder.Sql("""
            IF EXISTS (
                SELECT 1 FROM [Payments]
                GROUP BY [CustomerId], [Year], [Month]
                HAVING COUNT(*) > 1
            )
            BEGIN
                ;THROW 51000, 'Duplicate monthly payments exist. Review them before applying this migration.', 1;
            END;
            """);

        migrationBuilder.DropIndex(
            name: "IX_Payments_CustomerId",
            table: "Payments");

        // Old paid records stay null because their original amounts are unknown.
        migrationBuilder.AddColumn<int>(
            name: "PaidFee",
            table: "Payments",
            type: "int",
            nullable: true);

        migrationBuilder.CreateIndex(
            name: "IX_Payments_CustomerId_Year_Month",
            table: "Payments",
            columns: new[] { "CustomerId", "Year", "Month" },
            unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "IX_Payments_CustomerId_Year_Month",
            table: "Payments");

        migrationBuilder.DropColumn(name: "PaidFee", table: "Payments");

        migrationBuilder.CreateIndex(
            name: "IX_Payments_CustomerId",
            table: "Payments",
            column: "CustomerId");
    }
}
