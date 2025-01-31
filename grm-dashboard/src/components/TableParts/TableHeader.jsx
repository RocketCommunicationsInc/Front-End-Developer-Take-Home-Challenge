import {
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxButton,
} from "@astrouxds/react";
import PropTypes from "prop-types";

TableHeader.propTypes = {
  cols: PropTypes.array,
  someExpanded: PropTypes.bool,
  expandAll: PropTypes.func,
  collapseAll: PropTypes.func,
};

function TableHeader({ cols, someExpanded, expandAll, collapseAll }) {
  return (
    <>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          {cols.map((col) => (
            <RuxTableHeaderCell key={col.id} className="p-2">
              {col.id === "expand" && (
                <>
                  {
                    //No true values in our expandedRows
                    someExpanded ? (
                      <RuxButton onClick={() => collapseAll()}>
                        Collapse All
                      </RuxButton>
                    ) : (
                      <RuxButton onClick={() => expandAll()}>
                        Expand All
                      </RuxButton>
                    )
                  }
                </>
              )}
              {col.label}
            </RuxTableHeaderCell>
          ))}
        </RuxTableHeaderRow>
      </RuxTableHeader>
    </>
  );
}

export default TableHeader;
