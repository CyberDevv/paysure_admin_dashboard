import { Button, Menu, MenuItem, Pagination } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
} from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { EmptyDataRowSVG } from './SVGIcons'

const CustomNoRowsOverlay = () => {
  return (
    <div tw="flex items-center justify-center w-full h-full">
      <div tw="text-center py-10">
        <EmptyDataRowSVG />
        <h1 tw="text-2xl text-[#979797] mt-3.5">
          There&apos;s nothing to show yet
        </h1>
        <p tw="text-[15px] text-[#979797] mt-3.5">
          We&apos;ll have something to show you once transaction start happening
        </p>
      </div>
    </div>
  )
}

const DataGridView = ({
  rows,
  columns,
  limited,
  hasExportBtn,
  children,
  className,
  pageSize,
  pagination,
  pageId,
  recordCount,
  columnVisibilityModel,
}) => {
  const router = useRouter()

  // Datagird Toolbar
  const CustomToolbar = () => {
    // useState hook
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const apiRef = useGridApiContext()

    // funcitons
    const handleExportCSV = options => apiRef.current.exportDataAsCsv(options)

    const handleExportPrint = options =>
      apiRef.current.exportDataAsPrint(options)

    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleExportAsCSV = () => {
      handleClose()

      handleExportCSV({ filename: 'my-export.csv' })
    }

    const handlePrint = () => {
      handleClose()

      handleExportPrint({ filename: 'my-export.csv' })
    }

    return (
      <GridToolbarContainer css={children ? tw`mb-6` : tw`p-0`}>
        <FuncWrappper>
          <div css={className}>
            {children}

            {/* Export btn */}
            {hasExportBtn && (
              <div tw="flex justify-end w-full">
                <MUIButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  tw="min-w-[fit-content] w-[fit-content] max-w-[fit-content]"
                >
                  Export data
                </MUIButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleExportAsCSV}>Export as CSV</MenuItem>
                  <MenuItem onClick={handlePrint}>Print</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </FuncWrappper>
      </GridToolbarContainer>
    )
  }

  const CustomPagination = () => {
    const handlePaginationChange = (e, value) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: value,
        },
      })
    }

    return (
      <div tw="space-x-4">
        <Pagination
          page={Number(pageId)}
          count={Math.ceil(Number(recordCount) / 10)}
          shape="rounded"
          onChange={handlePaginationChange}
          siblingCount={1}
          boundaryCount={1}
          size="small"
        />
      </div>
    )
  }

  return (
    <Wrapper>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <DataGrid
            // rows={ rows}
            rows={limited ? rows.slice(0, 5) : rows}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter={!pagination}
            disableSelectionOnClick
            rowHeight={70}
            pageSize={pageSize}
            pagination={pagination}
            columnVisibilityModel={columnVisibilityModel}
            components={{
              Toolbar: CustomToolbar,
              Pagination: CustomPagination,
              // NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              border: 'none',
              '& .grid-header': {
                backgroundColor: '#F3F7FC',
                fontSize: '13px',
                paddingX: '15px',
                color: '#000',
              },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #EBF2FA',
                fontSize: '13px',
                color: '#16192C',
              },
              '& .MuiDataGrid-virtualScrollerContent': {
                minHeight: '60px !important',
              },
              '& .MuiDataGrid-cell': {
                paddingX: '20px',

                '&:focus': {
                  outline: 'none',
                },
              },
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

// Tailwind styles
const Wrapper = tw.div`my-4`
const FuncWrappper = tw.div`w-full space-y-2.5 2xl:(flex items-center justify-between space-x-2.5 space-y-0)`
const MUIButton = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`

export default DataGridView
