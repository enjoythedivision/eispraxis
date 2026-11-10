using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eispraxis.Api.Migrations;

public partial class AddCustomerArchive : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<bool>(
            name: "IsArchived",
            table: "Customers",
            type: "bit",
            nullable: false,
            defaultValue: false);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(name: "IsArchived", table: "Customers");
    }
}
